const express = require("express");

const router = express.Router();

const {
  getPendingDoctors,
  approveDoctor,
  rejectDoctor,
  getAllDoctors,
  addTokens,
  getAllPatients,
} = require("../controllers/adminController");

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router.post("/add-tokens", verifyToken, isAdmin, addTokens);
router.get("/doctors", verifyToken, isAdmin, getPendingDoctors);
router.put("/approve-doctor/:id", verifyToken, isAdmin, approveDoctor);
router.put("/reject-doctor/:id", verifyToken, isAdmin, rejectDoctor);
router.get("/all-doctors", verifyToken, isAdmin, getAllDoctors);
router.get("/all-patients", verifyToken, isAdmin, getAllPatients);

module.exports = router;
