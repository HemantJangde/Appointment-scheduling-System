import React from "react";

export default function About() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      {/* About Us Header */}
      <div className="text-2xl text-center pt-8">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500">ABOUT US</p>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
      </div>

      {/* About Content */}
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px] shadow-md rounded"
          src="https://prescripto.vercel.app/assets/about_image-MG9zrc7b.png"
          alt="Dr Hub"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            <b>Dr Hub</b> is a smart healthcare platform designed to make
            booking doctor appointments simple, fast, and reliable. We connect
            patients with trusted medical professionals across multiple
            specialities, ensuring quality healthcare is always within reach.
          </p>

          <p>
            Whether you need a general physician or a specialist, Dr Hub allows
            you to browse doctors, check availability, and book appointments
            seamlessly. Our platform focuses on convenience, transparency, and
            efficiency to improve your healthcare experience.
          </p>

          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission is to simplify healthcare access by providing a
            user-friendly platform where patients can easily find the right
            doctor, book appointments, and receive timely medical care. We aim
            to bridge the gap between patients and healthcare providers through
            technology.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-xl py-4">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500">
            WHY <span className="text-gray-700 font-medium">CHOOSE US</span>
          </p>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
      </div>

      {/* Features */}
      <div className="flex flex-col md:flex-row text-sm mb-20">
        
        <div className="border border-gray-300 rounded-sm px-10 md:px-16 py-10 flex flex-col gap-4">
          <b>Trusted Doctors</b>
          <p className="text-gray-600">
            We connect you with verified and experienced doctors across various
            specialities to ensure quality healthcare services.
          </p>
        </div>

        <div className="border border-gray-300 rounded-sm px-10 md:px-16 py-10 flex flex-col gap-4">
          <b>Easy Appointment Booking</b>
          <p className="text-gray-600">
            Book appointments in just a few clicks with our simple and intuitive
            interface—no long waiting queues.
          </p>
        </div>

        <div className="border border-gray-300 rounded-sm px-10 md:px-16 py-10 flex flex-col gap-4">
          <b>24/7 Support</b>
          <p className="text-gray-600">
            Our platform ensures you can access healthcare services anytime,
            anywhere with reliable support and seamless experience.
          </p>
        </div>

      </div>

      
    </div>
  );
}