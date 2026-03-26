import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useSlots from "../../hooks/useSlots";
import BookingSlots from "../../components/BookingSlots";
import API from "../../services/api";
import defaultUser from "../../assets/defaultUser.jpg";
import toast from "react-hot-toast";

export default function DoctorDetail() {
  const { id } = useParams();
  const location = useLocation();
  const doctor = location.state;

  const { slotsData, loading, error, refetch } = useSlots(id);

  // 🔹 NEW: token state
  const [tokens, setTokens] = useState(0);

  // 🔹 Fetch tokens
  const fetchTokens = async () => {
    try {
      const { data } = await API.get("/patient/my-tokens");
      setTokens(data.tokens);
    } catch {
      toast.error("Failed to load tokens");
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  const handleBooking = async ({ date, slotId }) => {
    const requiredTokens = doctor.fees || 200;

    if (tokens < requiredTokens) {
      toast.error(`You need ${requiredTokens} tokens to book`);
      return;
    }

    try {
      const { data } = await API.post("/patient/book-appointment", {
        doctorId: id,
        slotId,
        date,
      });

      toast.success(data.message || "Booked successfully");

      fetchTokens(); // sync with backend
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    }
  };

if (!doctor) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">

      {/* 🌈 Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>

      {/* Glow */}
      <div className="absolute w-[300px] h-[300px] bg-purple-300/20 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-[250px] h-[250px] bg-pink-300/20 blur-3xl rounded-full bottom-10 right-10"></div>

      {/* Content */}
      <div className="relative z-10 text-center backdrop-blur-xl bg-white/70 border border-white/40 shadow-xl rounded-2xl p-8 max-w-md">

        {/* Icon */}
        <div className="text-5xl mb-4">😔</div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800">
          Doctor Not Found
        </h2>

        {/* Message */}
        <p className="text-gray-500 mt-2 text-sm">
          The doctor you are looking for does not exist or may have been removed.
        </p>

        {/* Button */}
        <button
          onClick={() => window.history.back()}
          className="mt-6 px-5 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition"
        >
          Go Back
        </button>

      </div>
    </div>
  );
}

  return (
  <div className="relative max-w-6xl mx-auto px-4 py-10 overflow-hidden">

  {/* 🌈 Background */}
  <div className="absolute inset-0 b from-blue-50 via-purple-50 to-pink-50"></div>

  {/* Glow */}
  <div className="absolute w-[300px] h-[300px] bg-purple-300/20 blur-3xl rounded-full top-10 left-10"></div>
  <div className="absolute w-[250px] h-[250px] bg-pink-300/20 blur-3xl rounded-full bottom-10 right-10"></div>

  <div className="relative z-10">

    {/* 🔹 Doctor Card */}
    <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-xl rounded-2xl p-6 flex flex-col md:flex-row gap-6">

      {/* Image */}
      <div className="flex justify-center md:justify-start">
        <img
          src={doctor.image || defaultUser}
          alt={doctor.name}
          className="w-36 h-36 md:w-44 md:h-44 object-cover rounded-2xl border-4 border-white shadow-md"
        />
      </div>

      {/* Info */}
      <div className="flex-1">

        {/* Name + Badge */}
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {doctor.name}
          </h2>

          <span className="px-3 py-1 text-xs bg-indigo-100 text-indigo-600 rounded-full">
            {doctor.specialization}
          </span>
        </div>

        {/* Experience */}
        <p className="mt-3 text-gray-600 text-sm">
          🩺 {doctor.experience} years experience
        </p>

        {/* Fees */}
        <p className="mt-4 text-lg font-semibold text-indigo-600">
          🎟 {doctor.fees || 200} Tokens / Consultation
        </p>

        {/* About */}
        <p className="mt-4 text-gray-600 text-sm leading-relaxed">
          {doctor.about ||
            "Experienced and dedicated doctor committed to providing the best healthcare services."}
        </p>

        {/* Tokens */}
        <div className="mt-5 inline-block bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl text-sm font-medium shadow-sm">
          🎟 Your Tokens: {tokens}
        </div>
      </div>
    </div>

    {/* 🔹 Booking Section */}
    <div className="mt-10 backdrop-blur-xl bg-white/70 border border-white/40 shadow-xl rounded-2xl p-6">

      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Select Appointment Slot
      </h3>

      {/* Warning */}
      {tokens < (doctor.fees || 200) && (
        <div className="mb-4 px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium">
          ❌ You need {doctor.fees || 200} tokens to book
        </div>
      )}

      {/* Slots */}
      <BookingSlots
        slotsData={slotsData}
        loading={loading}
        error={error}
        onBook={handleBooking}
        tokens={tokens}
      />
    </div>

  </div>
</div>
  );
}
