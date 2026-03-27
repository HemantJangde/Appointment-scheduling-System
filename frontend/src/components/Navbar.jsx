import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUser, getRole, logout } from "../utils/auth";
import logo from "../assets/logo3.jpeg";
import AddAvailability from "../pages/Doctor/AddAvailability";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserMd } from "react-icons/fa";

export default function Navbar() {
  const user = getUser();

  
  const role = getRole();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // 🔹 Center Menu Links
  const CenterMenu = () => (
    <>
      {!role && (
        <>
          <Link to="/"    onClick={() => setIsOpen(!isOpen)} className="nav-link">
            Home
          </Link>
          <Link to="/about"    onClick={() => setIsOpen(!isOpen)} className="nav-link">
            About
          </Link>
          <Link to="/contact"    onClick={() => setIsOpen(!isOpen)} className="nav-link">
            Contact
          </Link>
        </>
      )}

      {role === "patient" && (
        <>
          <Link to="/"    onClick={() => setIsOpen(!isOpen)} className="nav-link">
            Home
          </Link>
          <Link to="/doctors"    onClick={() => setIsOpen(!isOpen)} className="nav-link">
            Doctors
          </Link>
          <Link to="/about"    onClick={() => setIsOpen(!isOpen)} className="nav-link">
            About
          </Link>
          <Link to="/contact"    onClick={() => setIsOpen(!isOpen)} className="nav-link">
            Contact
          </Link>
          
              <Link to="/buyTokens"    onClick={() => setIsOpen(!isOpen)} className="nav-link">
            Buy Token
          </Link>
        </>
      )}

      {role === "doctor" && (
        <>
          <Link to="/doctor-dashboard"    onClick={() => setIsOpen(!isOpen)} className="nav-link">
            Dashboard
          </Link>
          <Link to="/doctor/edit"    onClick={() => setIsOpen(!isOpen)} className="nav-link">
            Edit Profile
          </Link>
        </>
      )}

      {role === "admin" && (
        <>
          <Link to="/admin-dashboard"    onClick={() => setIsOpen(!isOpen)} className="nav-link">
            Dashboard
          </Link>
        </>
      )}
    </>
  );

  // 🔹 Right Side Actions
  const RightMenu = () => (
    <>
      {!role && (
        <>
          <Link to="/login" onClick={() => setIsOpen(!isOpen)} className="btn-outline">
            Login
          </Link>
          <Link to="/register" onClick={() => setIsOpen(!isOpen)} className="btn-primary">
            Register
          </Link>
        </>
      )}

      {role === "patient" && (
        <>
          <Link to="/profile" onClick={() => setIsOpen(!isOpen)} className="btn-ghost">
            👤 {user?.name}
          </Link>
        
          <button onClick={handleLogout} className="btn-danger">
            Logout
          </button>
        </>
      )}
      {role === "doctor" && (
        <>
          {/* <AddAvailability />  */}
          <button onClick={handleLogout} className="btn-danger">
            Logout
          </button>
        </>
      )}

      {role === "admin" && (
        <>
          <button onClick={handleLogout} className="btn-danger">
            Logout
          </button>
        </>
      )}
    </>
  );

 return (
  <div className="sticky top-0 z-50 bg-gray-300/40 backdrop-blur-xl border border-white/30">
    <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      
      {/* 🔹 LEFT: Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-2 rounded-xl shadow-sm">
          <FaUserMd className="text-white text-lg" />
        </div>

        <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Dr Hub
        </h1>
      </div>

      {/* 🔹 CENTER */}
      <div className="hidden lg:flex items-center gap-8 text-gray-800 font-semibold">
        <CenterMenu />
      </div>

      {/* 🔹 RIGHT */}
      <div className="hidden lg:flex items-center gap-3">
        <RightMenu />
      </div>

      {/* 🔹 Mobile Button */}
      <button
        className="lg:hidden text-gray-800 text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX /> : <HiMenu />}
      </button>
    </div>

    {/* 🔻 Mobile Menu */}
    {isOpen && (
      <div className="lg:hidden  bg-white/60 backdrop-blur-md px-6 pb-4 flex flex-col gap-4 text-gray-800 shadow-lg">
        <CenterMenu />
        <div className="border-t  border-gray-200/60 pt-3 flex flex-col gap-3">
          <RightMenu />
        </div>
      </div>
    )}
  </div>
);
}
