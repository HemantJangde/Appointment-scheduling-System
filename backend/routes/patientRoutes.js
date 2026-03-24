const express = require("express");

const router = express.Router();

const {
  getDoctors,
  getAvailableSlots,
  bookAppointment,
    getMyAppointments,
  cancelAppointment,getMyTokens
} = require("../controllers/patientController");

const { verifyToken, isPatient } = require("../middleware/authMiddleware");
router.get("/my-tokens", verifyToken, isPatient, getMyTokens);
router.get("/doctors", verifyToken, isPatient, getDoctors);

router.get("/available-slots/:doctorId", verifyToken, isPatient, getAvailableSlots);

router.post("/book-appointment", verifyToken, isPatient, bookAppointment);

router.get("/my-appointments", verifyToken, isPatient, getMyAppointments);

router.put("/cancel-appointment/:id", verifyToken, isPatient, cancelAppointment);

module.exports = router;