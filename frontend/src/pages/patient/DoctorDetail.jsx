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

  if (!doctor) return <p>No doctor data found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 🔹 Doctor Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row gap-6">
        <div className="flex justify-center md:justify-start">
          <img
            src={doctor.image || defaultUser}
            alt={doctor.name}
            className="w-36 h-36 md:w-44 md:h-44 object-cover rounded-xl border"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {doctor.name}
            </h2>

          
          </div>

          <p className="text-gray-500 mt-1 text-sm md:text-base">
            {doctor.specialization}
          </p>

          <p className="mt-3 text-gray-600 text-sm">
            🩺 {doctor.experience} years experience
          </p>

          <p className="mt-3 text-lg font-semibold text-blue-600">
            Consultation Cost: 🎟 {doctor.fees || 200} Tokens
          </p>

          <p className="mt-4 text-gray-600 text-sm leading-relaxed">
            {doctor.about ||
              "Experienced and dedicated doctor committed to providing the best healthcare services."}
          </p>

          {/* 🔥 NEW: TOKEN DISPLAY */}
          <div className="mt-4 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg text-sm font-medium inline-block">
            🎟 Your Tokens: {tokens}
          </div>
        </div>
      </div>

      {/* 🔹 Booking Section */}
      <div className="mt-10 bg-white shadow-lg rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Select Appointment Slot
        </h3>

        {/* 🔥 Disable booking UI if no tokens */}
        {tokens < (doctor.fees || 200) && (
          <p className="text-red-500 mb-3">
            You need {doctor.fees || 200} tokens to book
          </p>
        )}

        <BookingSlots
          slotsData={slotsData}
          loading={loading}
          error={error}
          onBook={handleBooking}
          tokens={tokens}
        />
      </div>
    </div>
  );
}
