const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload"); // ✅ correct


const {
  registerPatient,
  registerDoctor,
  registerAdmin,
  login,
} = require("../controllers/authController");

router.post("/register-patient", registerPatient);

// const { registerDoctor } = ( "../controllers/doctorController.js");


router.post("/register-doctor", upload.single("image"), registerDoctor);

router.post("/register-admin", registerAdmin);

router.post("/login", login);

module.exports = router;
