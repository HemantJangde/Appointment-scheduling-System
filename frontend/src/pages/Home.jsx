// src/pages/Home.jsx
import { Link } from "react-router-dom";
import HeroSection from "./Home/HeroSection";
import PatientDashboard from "./PatientDashboard";

export default function Home() {
  return (
    <>
    <PatientDashboard/>
    <HeroSection/>
    </>
  );
}   