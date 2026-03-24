import { Link } from "react-router-dom";
import heroImage from '../../assets/heroImage.jpg'

const HeroSection = () => {
  return (
    <div className="bg-base-100 mt-12  rounded-xl px-6 md:px-10 lg:px-20 py-10 md:py-16 flex flex-col md:flex-row items-center gap-10">

      {/* LEFT CONTENT */}
     <div className="max-w-prose text-left">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Book Appointments with
            <strong className="text-primary"> Trusted Doctors </strong>
            instantly
          </h1>

          <p className="mt-4 text-base text-gray-700 sm:text-lg/relaxed">
            Dr Hub helps you find the right doctors, check availability, and
            book appointments بسهولة. Get quality healthcare at your fingertips.
          </p>

          <div className="mt-4 flex gap-4 sm:mt-6">
            
            <Link
              to="/doctors"
              className="inline-block rounded bg-primary px-5 py-3 font-medium text-white shadow-sm hover:opacity-90 transition"
            >
              Book Appointment
            </Link>

            <Link
              to="/about"
              className="inline-block rounded border border-gray-300 px-5 py-3 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition"
            >
              Learn More
            </Link>

          </div>
        </div>

      {/* RIGHT IMAGE */}
      <div className="md:w-1/2 relative flex justify-center">
      <img
  src={heroImage}
  alt="Doctor"
  className="mx-auto w-full max-w-md object-contain"
/>
      </div>
    </div>
  );
};

export default HeroSection;