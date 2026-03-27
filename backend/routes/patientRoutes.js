const express = require("express");

const router = express.Router();
const upload = require("../middleware/upload");

const {
  getDoctors,
  getAvailableSlots,
  bookAppointment,
  getMyAppointments,
  cancelAppointment,
  getMyTokens,
  updatePatientProfile,
  getPatientProfile
} = require("../controllers/patientController");

const { verifyToken, isPatient } = require("../middleware/authMiddleware");
router.get("/my-tokens", verifyToken, isPatient, getMyTokens);
router.get("/doctors", verifyToken, isPatient, getDoctors);

router.get(
  "/available-slots/:doctorId",
  verifyToken,
  isPatient,
  getAvailableSlots,
);

router.get("/profile",verifyToken, isPatient, getPatientProfile);
router.put("/profile",  upload.single("image"), verifyToken, isPatient, updatePatientProfile);

router.post("/book-appointment", verifyToken, isPatient, bookAppointment);

router.get("/my-appointments", verifyToken, isPatient, getMyAppointments);

router.put(
  "/cancel-appointment/:id",
  verifyToken,
  isPatient,
  cancelAppointment,
);

module.exports = router;
