const Availability = require("../models/Availability");
const Appointment = require("../models/Appointment");

const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
// const Doctor = require("../models/Doctor");
const Transaction = require("../models/Transaction");

exports.addTokens = async (req, res) => {
  try {
    const { userId, amount, role } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    let user;

    if (role === "patient") {
      user = await Patient.findByIdAndUpdate(
        userId,
        { $inc: { tokens: amount } },
        { new: true }
      );
    } else if (role === "doctor") {
      user = await Doctor.findByIdAndUpdate(
        userId,
        { $inc: { tokens: amount } },
        { new: true }
      );
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Transaction.create({
      user: userId,
      type: "credit",
      amount,
      reason: "admin_add"
    });

    res.json({
      message: "Tokens added successfully",
      tokens: user.tokens
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// GET /doctor/profile
exports.getProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user.id).select("-password"); // exclude password
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Profile fetched successfully", data: doctor });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Failed to fetch profile", error: error.message });
  }
};
// PUT /doctor/profile
exports.updateProfile = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Optional: hash password if provided
  

    // Optional: upload image if file is provided
    if (req.file && req.file.path) {
      updateData.image = req.file.path; // multer-cloudinary should attach `path`
    }

    // Update doctor profile
    const doctor = await Doctor.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
      runValidators: true,
      context: "query",
    }).select("-password");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      data: doctor,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
};
// exports.addAvailability = async (req, res) => {

//   try {

//     const { date, startTime, endTime } = req.body;

//     const slots = [];

//     let start = parseInt(startTime.split(":")[0]) * 60 + parseInt(startTime.split(":")[1]);
//     let end = parseInt(endTime.split(":")[0]) * 60 + parseInt(endTime.split(":")[1]);

//     while (start < end) {

//       let hours = Math.floor(start / 60);
//       let minutes = start % 60;

//       let time =
//         String(hours).padStart(2, "0") +
//         ":" +
//         String(minutes).padStart(2, "0");

//       slots.push({ time });

//       start += 15; // 15 minute slot
//     }

//     const availability = new Availability({
//       doctor: req.user.id,
//       date,
//       slots
//     });

//     await availability.save();

//     res.json({
//       message: "Availability with slots created",
//       availability
//     });

//   } catch (error) {

//     res.status(500).json({ error: error.message });

//   }
// };

exports.addAvailability = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;

    if (startTime >= endTime) {
      return res.status(400).json({
        message: "End time must be greater than start time",
      });
    }

    let start =
      parseInt(startTime.split(":")[0]) * 60 +
      parseInt(startTime.split(":")[1]);

    let end =
      parseInt(endTime.split(":")[0]) * 60 +
      parseInt(endTime.split(":")[1]);

    const newSlots = [];

    while (start < end) {
      let hours = Math.floor(start / 60);
      let minutes = start % 60;

      let time =
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0");

      newSlots.push({
        time,
        isBooked: false,
      });

      start += 15;
    }

    // check existing availability
    let availability = await Availability.findOne({
      doctor: req.user.id,
      date,
    });

    // if availability exists → add slots
    if (availability) {

      const existingSlots = availability.slots;

      const mergedSlots = [...existingSlots, ...newSlots];

      // remove duplicate times
      const uniqueSlots = mergedSlots.filter(
        (slot, index, self) =>
          index === self.findIndex((s) => s.time === slot.time)
      );

      availability.slots = uniqueSlots;

      await availability.save();

      return res.json({
        message: "Slots added to existing availability",
        availability,
      });
    }

    // create new availability
    availability = new Availability({
      doctor: req.user.id,
      date,
      slots: newSlots,
    });

    await availability.save();

    res.json({
      message: "Availability created",
      availability,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getMyAvailability = async (req, res) => {
  try {
    const slots = await Availability.find({
      doctor: req.user.id,
    });

    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctor: req.user.id,
    })
      .populate("patient", "name email phone")
      .sort({ date: 1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteAvailabilityByDate = async (req, res) => {
  try {
    const { date } = req.params;

    const availability = await Availability.findOne({
      doctor: req.user.id,
      date,
    });

    if (!availability) {
      return res.status(404).json({
        message: "Availability not found for this date",
      });
    }

    // 🔴 Check if any slot is booked
    const hasBookedSlot = availability.slots.some(
      (slot) => slot.isBooked
    );

    if (hasBookedSlot) {
      return res.status(400).json({
        message: "Cannot delete. Some slots are already booked",
      });
    }

    // ✅ Safe to delete
    await availability.deleteOne();

    res.json({
      message: "Availability deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { startTime, endTime } = req.body;

    const availability = await Availability.findById(id);

    if (!availability) {
      return res.status(404).json({
        message: "Availability not found",
      });
    }

    const newSlots = [];

    let start =
      parseInt(startTime.split(":")[0]) * 60 +
      parseInt(startTime.split(":")[1]);

    let end =
      parseInt(endTime.split(":")[0]) * 60 + parseInt(endTime.split(":")[1]);

    while (start < end) {
      let hours = Math.floor(start / 60);
      let minutes = start % 60;

      let time =
        String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0");

      newSlots.push({
        time,
        isBooked: false,
      });

      start += 15;
    }

    // keep booked slots
    const bookedSlots = availability.slots.filter(
      (slot) => slot.isBooked === true,
    );

    // combine booked + new slots and remove duplicates
    const uniqueSlots = [...bookedSlots, ...newSlots].reduce((acc, slot) => {
      if (!acc.find((s) => s.time === slot.time)) {
        acc.push(slot);
      }

      return acc;
    }, []);

    availability.startTime = startTime;
    availability.endTime = endTime;

    // ✅ assign unique slots here
    availability.slots = uniqueSlots;

    await availability.save();
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

