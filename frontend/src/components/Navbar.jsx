import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUser, getRole, logout } from "../utils/auth";
import logo from "../assets/logo3.jpeg";
import AddAvailability from "../pages/Doctor/AddAvailability";

export default function Navbar() {
  const user = getUser();
  const role = getRole();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // 🔹 Menu Items (Reusable)
  const MenuItems = () => (
    <>
      {!role && (
        <>
          <Link
            onClick={() => setIsOpen(false)}
            to="/"
            className="btn btn-ghost"
          >
            Home
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/about"
            className="btn btn-ghost"
          >
            About
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/contact"
            className="btn btn-ghost"
          >
            Contact
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/login"
            className="btn btn-outline btn-neutral"
          >
            Login
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/register"
            className="btn btn-primary"
          >
            Register
          </Link>
        </>
      )}

      {role === "patient" && (
        <>
          <Link
            onClick={() => setIsOpen(false)}
            to="/"
            className="btn btn-ghost"
          >
            Home
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/doctors"
            className="btn btn-ghost"
          >
            Doctors
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/about"
            className="btn btn-ghost"
          >
            About
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/contact"
            className="btn btn-ghost"
          >
            Contact
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/profile"
            className="btn btn-ghost"
          >
            Profile
          </Link>
          <button onClick={handleLogout} className="btn btn-error btn-sm">
            Logout
          </button>
        </>
      )}

      {role === "doctor" && (
        <>
          <Link
            onClick={() => setIsOpen(false)}
            to="/doctor-dashboard"
            className="btn btn-ghost"
          >
            Dashboard
          </Link>
         
          <Link
            to="/doctor/edit"
             onClick={() => setIsOpen(false)}
            className="btn btn-ghost "
          >
            Edit Profile
          </Link>
          <AddAvailability />
          <button onClick={handleLogout} className="bg-red-600 font-bold   text-white px-5 py-2 rounded-lg shadow hover:bg-red-700 transition">
            Logout
          </button>
        </>
      )}

      {role === "admin" && (
        <>
          <Link to="/admin-dashboard" className="btn btn-ghost">
            Admin Dashboard
          </Link>
          <button onClick={handleLogout} className="btn  btn-xl">
            Logout
          </button>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-6">
      {/* 🔹 Left: Logo + Mobile Menu */}
      <div className="flex-1 flex items-center gap-2">
        {/* Logo */}
        <Link to="/">
          <img src={logo} className="w-28 md:w-32" alt="logo" />
        </Link>
      </div>

      {/* 🔹 Desktop Menu */}
      <div className="hidden lg:flex gap-3">
        <MenuItems />
      </div>

      {/* 🔹 Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-base-100 shadow-md flex flex-col items-start p-4 gap-3 lg:hidden z-50">
          <MenuItems />
        </div>
      )}

      {/* 🍔 Mobile Hamburger */}
      <button
        className="btn btn-ghost lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
    </div>
  );
}
