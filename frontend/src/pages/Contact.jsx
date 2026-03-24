import React from "react";
// import contactImage from "../assets/contact.jpg";

export default function Contact() {

  
  return (
    <div className="mx-4 sm:mx-[10%]">
      {/* 🔹 Header */}
      <div className="text-center text-2xl pt-10">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500">CONTACT US</p>
          <p className="w-8 sm:w-12 h-[2px] bg-gray-700"></p>
        </div>
      </div>

      {/* 🔹 Contact Section */}
      <div className="my-12 flex flex-col md:flex-row items-center gap-12 mb-24 px-4">
        {/* Image */}
        <img
          className="w-full md:max-w-[500px] rounded-lg shadow-md"
          src="https://prescripto.vercel.app/assets/contact_image-IJu_19v_.png"
          alt="FashionHub Contact"
        />

        {/* Info */}
        <div className="flex flex-col gap-6 text-gray-600 max-w-md">
          <p className="font-semibold text-2xl text-gray-800">Get in Touch</p>

          <p>
      We'd love to hear from you! Whether you have questions about booking
  appointments, finding the right doctor, or any healthcare services —
  our team is here to help you.
          </p>

          <div>
            <p className="font-semibold text-gray-800">Our Office</p>
            <p className="text-gray-500">
              Chhattisgarh, India <br />
              Dr.Hub Headquarters
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-800">Contact Details</p>
            <p className="text-gray-500">
              📞 +91 98765 43210 <br />
              📧 support@DrHub.com
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-800">Careers at Dr.Hub</p>
          <p>
  Be part of Dr Hub and help us revolutionize how people access healthcare services.
</p>
          </div>

          <button className="border border-black px-6 py-3 w-fit text-sm hover:bg-black hover:text-white transition">
            Explore Jobs
          </button>
        </div>
      </div>

      {/* 🔹 Subscribe Section */}
      
    </div>
  );
}
