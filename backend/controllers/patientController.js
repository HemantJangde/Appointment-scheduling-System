// const Doctor = require("../models/Doctor");
const Availability = require("../models/Availability");
const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Transaction = require("../models/Transaction");
// const Patient = require("../models/Patient");

exports.getMyTokens = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id).select("tokens");

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({ tokens: patient.tokens });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getDoctors = async (req, res) => {

  try {

    const doctors = await Doctor.find({ status: "approved" });

    res.json(doctors);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

exports.getAvailableSlots = async (req, res) => {

  try {

    const { doctorId } = req.params;

    const availability = await Availability.find({
      doctor: doctorId
    });

    const availableSlots = availability.map(day => ({
      date: day.date,
      slots: day.slots.filter(slot => !slot.isBooked)
    }));

    res.json(availableSlots);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};



exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, slotId } = req.body;
    const patientId = req.user.id;

    // 🔹 1. Get doctor from DB (SECURE)
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const requiredTokens = doctor.fees || 200;

    // 🔹 2. Check patient tokens
    const patient = await Patient.findById(patientId);

    if (!patient || patient.tokens < requiredTokens) {
      return res.status(400).json({
        message: `You need ${requiredTokens} tokens`
      });
    }

    // 🔹 3. Find availability
    const availability = await Availability.findOne({
      doctor: doctorId,
      date
    });

    if (!availability) {
      return res.status(404).json({ message: "No availability found" });
    }

    const slot = availability.slots.id(slotId);

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if (slot.isBooked) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    // 🔹 4. Transfer tokens (CORRECT AMOUNT)
    await Patient.findByIdAndUpdate(patientId, {
      $inc: { tokens: -requiredTokens }
    });

    await Doctor.findByIdAndUpdate(doctorId, {
      $inc: { tokens: requiredTokens }
    });

    // 🔹 5. Book slot
    slot.isBooked = true;
    await availability.save();

    // 🔹 6. Create appointment
    const appointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      date,
      time: slot.time,
      tokenUsed: requiredTokens // ✅ correct
    });

    await appointment.save();

    // 🔹 7. Transactions (CORRECT AMOUNT)
    await Transaction.create([
      {
        user: patientId,
        type: "debit",
        amount: requiredTokens,
        reason: "booking"
      },
      {
        user: doctorId,
        type: "credit",
        amount: requiredTokens,
        reason: "booking"
      }
    ]);

    res.json({
      message: "Appointment booked successfully",
      appointment,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMyAppointments = async (req, res) => {

  try {

    const appointments = await Appointment.find({
      patient: req.user.id
    })
    .populate("doctor", "name specialization")
    .sort({ date: 1 });

    res.json(appointments);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

exports.cancelAppointment = async (req, res) => {

  try {

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );

    res.json({
      message: "Appointment cancelled successfully",
      appointment
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

exports.addAvailability = async (req, res) => {

  try {

    const { date, startTime, endTime } = req.body;

    const slots = [];

    let start = parseInt(startTime.split(":")[0]) * 60 + parseInt(startTime.split(":")[1]);
    let end = parseInt(endTime.split(":")[0]) * 60 + parseInt(endTime.split(":")[1]);

    while (start < end) {

      let hours = Math.floor(start / 60);
      let minutes = start % 60;

      let time =
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0");

      slots.push({ time });

      start += 15; // 15 minute slot
    }

    const availability = new Availability({
      doctor: req.user.id,
      date,
      slots
    });

    await availability.save();

    res.json({
      message: "Availability with slots created",
      availability
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};