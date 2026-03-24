const express = require("express");
const cors = require("cors");
require("dotenv").config();
const JWT_SECRET = "supersecretkey";

const connectDB = require("./config/db");
const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const adminRoutes = require("./routes/adminRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");






const app = express();
connectDB();
app.use("/uploads", express.static("uploads"));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Smart Appointment Scheduling API Running");
});

app.use("/api", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/patient", patientRoutes);






const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});