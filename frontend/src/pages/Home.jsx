// src/pages/Home.jsx
import { Link } from "react-router-dom";
import HeroSection from "./Home/HeroSection";
import QuickServices from "./Home/QuickServices";

import PatientDashboard from "./PatientDashboard";
import BMICalculator from "./Home/BMICalculator";
import FeaturedDoctors from "./Home/FeaturedDoctors";
import HowItWorks from "./Home/HowItWorks";
import Testimonials from "./Home/Testimonials";
import HealthTips from "./Home/HealthTips";
import Contact from "./Contact";

export default function Home() {
  return (
    <>
    {/* <PatientDashboard/> */}
    <HeroSection/>
    <BMICalculator/>
    <QuickServices/>
    {/* <FeaturedDoctors/> */}
    <HowItWorks/>
    <Testimonials/>
    <HealthTips/>
    {/* <Contact/> */}
    </>
  );
}   