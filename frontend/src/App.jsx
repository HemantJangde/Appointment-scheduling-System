import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import About from "./pages/About";
import Contact from "./pages/Contact";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Doctors from "./pages/patient/Doctors";
import DoctorDetail from "./pages/patient/DoctorDetail";

import AddAvailability from "./pages/Doctor/AddAvailability";
import DoctorProfileEdit from "./pages/Doctor/DoctorProfileEdit";
import ManageDoctor from "./pages/Doctor/ManageDoctor";

import PatientEditProfile from "./pages/patient/PatientEditProfile";
import BuyToken from "./pages/patient/BuyToken";

import ScrollToTop from "./services/ScrollToTop";
import { FollowerPointerCard } from "./components/ui/following-pointer";

function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <ScrollToTop />

      <FollowerPointerCard>
        <Routes>
          {/* 🌐 Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/doctor/:id" element={<DoctorDetail />} />

          <Route
            path="/doctors"
            element={
              <ProtectedRoute>
                <Doctors />
              </ProtectedRoute>
            }
          />

          {/* 👤 Patient Routes */}
          <Route
            path="/patient-dashboard"
            element={
              <ProtectedRoute>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <PatientEditProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/buyTokens"
            element={
              <ProtectedRoute>
                <BuyToken />
              </ProtectedRoute>
            }
          />

          {/* 🩺 Doctor Routes */}
          <Route
            path="/doctor-dashboard"
            element={
              <ProtectedRoute>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-availability"
            element={
              <ProtectedRoute>
                <AddAvailability />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manage-availability"
            element={
              <ProtectedRoute>
                <ManageDoctor />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor/edit"
            element={
              <ProtectedRoute>
                <DoctorProfileEdit />
              </ProtectedRoute>
            }
          />

          {/* 🛠 Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 🚫 404 Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </FollowerPointerCard>

        <Footer />
    </BrowserRouter>
  );
}

export default App;
