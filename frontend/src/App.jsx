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
// import DoctorsList from "./pages/patient/DoctorsList";
// import DoctorCard from "./pages/patient/DoctorCard";
// import DoctorProfile from "./pages/patient/DoctorProfile";
import Doctors from "./pages/patient/Doctors";
import DoctorDetail from "./pages/patient/DoctorDetail";
import AddAvailability from "./pages/Doctor/AddAvailability";
import DoctorProfileEdit from "./pages/Doctor/DoctorProfileEdit";
import ManageDoctor from "./pages/Doctor/ManageDoctor";
import ScrollToTop from "./services/ScrollToTop";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />
          <Route
            path="/patient-dashboard"
            element={
              <ProtectedRoute>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patient-dashboard"
            element={
              <ProtectedRoute allowedRole="patient">
                <PatientDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor-dashboard"
            element={
              <ProtectedRoute allowedRole="doctor">
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/doctors" element={<Doctors/>} />
            <Route path="/doctor/:id" element={<DoctorDetail />} />

            <Route path="add-availability" element={<AddAvailability/>}/>
            <Route path="/doctor/edit" element={<DoctorProfileEdit />} />
            <Route path="/manage-availability" element={<ManageDoctor/>}/>




        </Routes>
      {/* <hr className="text-black/20"/> */}

        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
