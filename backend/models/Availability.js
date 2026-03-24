const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({

  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true
  },

  date: {
    type: String,
    required: true
  },

  slots: [
    {
      time: String,
      isBooked: {
        type: Boolean,
        default: false
      }
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model("Availability", availabilitySchema);