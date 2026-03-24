const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      set: (value) => {
        if (value.startsWith("Dr.")) return value;
        return `Dr. ${value}`;
      },
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

    qualification: {
      type: String,
      required: true,
    },

    specialization: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
        require: true,
    },
    licenseNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      require: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    tokens: {
      type: Number,
      default: 0,
    },
    fees: {
  type: Number,
  required: true,
  default: 200, // default token cost
},
  },
  { timestamps: true },
);

module.exports = mongoose.model("Doctor", doctorSchema);
