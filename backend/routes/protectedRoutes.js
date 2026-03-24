const express = require("express");

const router = express.Router();

const {
  verifyToken,
  isAdmin,
  isDoctor,
  isPatient
} = require("../middleware/authMiddleware");

router.get("/admin", verifyToken, isAdmin, (req, res) => {

  res.json({
    message: "Welcome Admin"
  });

});

router.get("/doctor", verifyToken, isDoctor, (req, res) => {

  res.json({
    message: "Welcome Doctor"
  });

});

router.get("/patient", verifyToken, isPatient, (req, res) => {

  res.json({
    message: "Welcome Patient"
  });

});

module.exports = router;