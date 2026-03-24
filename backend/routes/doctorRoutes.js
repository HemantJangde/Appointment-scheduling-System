const express = require("express");
const Doctor = require("../models/Doctor");
const router = express.Router();

const {
  addAvailability,
  getMyAvailability,
  getDoctorAppointments,
  deleteAvailabilityByDate,
  updateAvailability,
  getProfile
  ,updateProfile
} = require("../controllers/doctorController");

const { verifyToken, isDoctor } = require("../middleware/authMiddleware");


const upload = require("../middleware/upload"); // Multer + Cloudinary

router.get("/profile", verifyToken, isDoctor, getProfile);

// Update profile (image upload handled by multer-cloudinary)
router.put("/profile", verifyToken, isDoctor, upload.single("image"), updateProfile);


router.post("/add-availability", verifyToken, isDoctor, addAvailability);


router.get("/my-slots", verifyToken, isDoctor, getMyAvailability);


router.get("/appointments", verifyToken, isDoctor, getDoctorAppointments);


router.delete(
  "/delete-availability/:date",
  verifyToken,
  isDoctor,
  deleteAvailabilityByDate,
);

router.put(
  "/update-availability/:id",
  verifyToken,
  isDoctor,
  updateAvailability,
);

router.get("/my-tokens",verifyToken, isDoctor,  async (req, res) => {
  const doctor = await Doctor.findById(req.user.id).select("tokens");
  res.json({ tokens: doctor.tokens });
});


module.exports = router;
