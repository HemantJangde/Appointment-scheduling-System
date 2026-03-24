const Doctor = require("../models/Doctor");


const Patient = require("../models/Patient");
// const Doctor = require("../models/Doctor");
const Transaction = require("../models/Transaction");

exports.addTokens = async (req, res) => {
  try {
     const { userId, amount } = req.body;

  const patient = await Patient.findByIdAndUpdate(
    userId,
    { $inc: { tokens: amount } },
    { new: true }
  );

  res.json({
    message: "Tokens added",
    tokens: patient.tokens
  });
   

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPendingDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: "pending" });

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.approveDoctor = async (req, res) => {

  try {

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    res.json({
      message: "Doctor approved successfully",
      doctor
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};
exports.rejectDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true },
    );

    doctor.status = "rejected";
    await doctor.save();
    res.json({
      message: "Doctor rejected",
      doctor,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllDoctors = async (req, res) => {
  const doctors = await Doctor.find();

  res.json(doctors);
};


exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().select("name email tokens");
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


