import { EncryptedText } from "../../components/ui/encrypted-text";
import heroimage2 from "./heroimage2.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroimage2})`,
      }}
    >
      {/* 🔹 Light Glass Overlay */}
      <div className="absolute inset-0 bg-white/0.1 backdrop-blur-sm"></div>

      {/* 🔹 Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        <h1 className="mb-5 text-4xl md:text-6xl font-bold text-gray-900">
          
          Book Appointments with Trusted Doctors
        </h1>

        {/* <p className="mb-6 text-lg text-gray-700">
          Dr.Hub helps you find the best doctors, check availability, and book
          appointments easily — all in one place.
        </p> */}
         <p className="mx-auto max-w-lg py-10 text-left">
      <EncryptedText
        text=" Dr.Hub helps you find the best doctors, check availability, and book
          appointments easily — all in one place."
        encryptedClassName="text-neutral-500"
        revealedClassName="dark:text-white text-black"
        revealDelayMs={50}
      />
    </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/doctors" className="btn-primary">
            Find Doctors
          </Link>

          <Link to="/register" className="btn-outline">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;