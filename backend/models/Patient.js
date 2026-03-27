const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },

     // 🖼 Profile Image (Cloudinary URL)
    image: {
      type: String,
    },

    // 🩸 Blood Group
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },

    // 📏 Height (cm)
    height: {
      type: Number,
    },

    // ⚖️ Weight (kg)
    weight: {
      type: Number,
    },

    // 📋 Optional extra info
    age: {
      type: Number,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    tokens: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Patient", patientSchema);
