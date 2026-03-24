const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided"
    });
  }

  try {

    const decoded = jwt.verify(token, "supersecretkey");

    req.user = decoded;

    next();

  } catch (error) {

    res.status(401).json({
      message: "Invalid token"
    });

  }

};

exports.isAdmin = (req, res, next) => {

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access only"
    });
  }

  next();

};

exports.isDoctor = (req, res, next) => {

  if (req.user.role !== "doctor") {
    return res.status(403).json({
      message: "Doctor access only"
    });
  }

  next();

};

exports.isPatient = (req, res, next) => {

  if (req.user.role !== "patient") {
    return res.status(403).json({
      message: "Patient access only"
    });
  }

  next();

};