
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    let user = null;
    let role = "";

    // check patient
    user = await Patient.findOne({ email });
    if (user) role = "patient";

    // check doctor
    if (!user) {
      user = await Doctor.findOne({ email });
      if (user) role = "doctor";
    }

    // check admin
    if (!user) {
      user = await Admin.findOne({ email });
      if (user) role = "admin";
    }

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // doctor approval check
    if (role === "doctor" && user.status !== "approved") {
      return res.status(403).json({
        message: "Doctor not approved by admin yet"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: role },
      "supersecretkey",
      { expiresIn: "1d" }
    );

   res.json({
  message: "Login successful",
  role,
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email
  }
});

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


exports.registerPatient = async (req, res) => {

  try {

    const { name, email, password, phone } = req.body;

    const existingUser = await Patient.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Patient already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const patient = new Patient({
      name,
      email,
      password: hashedPassword,
      phone
    });

    await patient.save();

    res.status(201).json({
      message: "Patient registered successfully",
      patient
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

exports.registerDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      qualification,
      specialization,
      experience,
      licenseNumber,
      address,
      fees
    } = req.body;

    const existingDoctor = await Doctor.findOne({ email });

    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      qualification,
      specialization,
      experience,
      licenseNumber,
      address,
      fees,
      image: req.file ? req.file.path : "", // 🔥 ADD THIS
    });

    await doctor.save();

    res.status(201).json({
      message: "Doctor registered. Waiting for admin approval",
      doctor
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.registerAdmin = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      name,
      email,
      password: hashedPassword
    });

    await admin.save();

    res.status(201).json({
      message: "Admin created successfully"
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};