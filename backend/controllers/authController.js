
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const sendEmail = require("../utils/sendEmail");


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

const loginContent = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
    <!-- Header -->
    <div style="background-color: #2E86C1; color: #ffffff; padding: 20px; text-align: center;">
      <h1 style="margin: 0; font-size: 24px;">Portal Login Notification</h1>
    </div>

    <!-- Body -->
    <div style="padding: 20px; color: #333;">
      <p>Dear <b>${email}</b>,</p>
      <p>We are writing to inform you that your account has successfully logged in to our portal.</p>
      
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <p style="margin: 0;"><b>Date & Time:</b> ${new Date().toLocaleString()}</p>
        <p style="margin: 0;"><b>Email:</b> ${email}</p>
      </div>

      <p>If this was not you, please contact our support team immediately.</p>

      <p style="margin-top: 30px;">Best regards,<br/>
      <b>Hospital Support Team</b></p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f0f0f0; padding: 10px; text-align: center; font-size: 12px; color: #777;">
      &copy; ${new Date().getFullYear()} Hospital Portal. All rights reserved.
    </div>
  </div>
`;

sendEmail({
  to: email,
  subject: "Login Successful ",
  html: loginContent,
});

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
      image: req.file ? req.file.path : "",
    });

    await doctor.save();

    // 🔹 Prepare email content
   const emailContent = `
  <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background-color: #2E86C1; color: #ffffff; padding: 20px; text-align: center;">
      <h1 style="margin: 0; font-size: 24px;">New Doctor Registration</h1>
    </div>

    <!-- Body -->
    <div style="padding: 20px; color: #333;">
      <p>Dear Admin,</p>
      <p>A new doctor has successfully registered on the portal and requires your approval.</p>

      <!-- Doctor Details Card -->
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <h3 style="margin-top: 0;">Doctor Details:</h3>
        <ul style="list-style: none; padding-left: 0;">
          <li><b>Name:</b> ${doctor.name}</li>
          <li><b>Email:</b> ${doctor.email}</li>
          <li><b>Qualification:</b> ${doctor.qualification}</li>
          <li><b>Specialization:</b> ${doctor.specialization}</li>
          <li><b>Experience:</b> ${doctor.experience} years</li>
          <li><b>License Number:</b> ${doctor.licenseNumber}</li>
          <li><b>Address:</b> ${doctor.address}</li>
          <li><b>Fees:</b> ₹${doctor.fees}</li>
        </ul>
      </div>

      <p style="color: #c0392b; font-weight: bold;">
        Please login to the admin panel to review and approve this doctor.
      </p>

      <p>Best regards,<br/><b>Hospital Support Team</b></p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f0f0f0; padding: 10px; text-align: center; font-size: 12px; color: #777;">
      &copy; ${new Date().getFullYear()} Hospital Portal. All rights reserved.
    </div>
  </div>
`;

    // 🔹 Send email to admin
    await sendEmail({
      to: "hmntjangde@gmail.com",
      subject: "🩺 New Doctor Registration - Approval Required",
      html: emailContent,
    });

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