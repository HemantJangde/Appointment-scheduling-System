import { useState } from "react";

export default function BookingSlots({ slotsData, onBook, loading, error,tokens }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  if (loading) return <p className="mt-4">Loading slots...</p>;
  if (error) return <p className="text-red-500 mt-4">{error}</p>;
  if (!slotsData || slotsData.length === 0)
    return <p className="text-gray-500 mt-4">No available slots</p>;

  const getDayName = (dateStr) => {
    return new Date(dateStr)
      .toLocaleDateString("en-US", { weekday: "short" })
      .toUpperCase();
  };

  return (
<div className="mt-10">

  {/* Title */}
  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
    📅 Booking Slots
  </h3>

  {/* 📆 Dates */}
  <div className="flex gap-3 overflow-x-auto pb-2">

    {slotsData.map((day) => (
      <button
        key={day.date}
        onClick={() => {
          setSelectedDate(day.date);
          setSelectedTime(null);
        }}
        className={`flex flex-col items-center justify-center 
        min-w-[70px] h-16 rounded-xl transition-all duration-300
        border 
        ${
          selectedDate === day.date
            ? "bg-primary text-white shadow-lg scale-105"
            : "hover:bg-base-200"
        }`}
      >
        <span className="text-xs opacity-70">
          {getDayName(day.date)}
        </span>
        <span className="text-lg font-bold">
          {new Date(day.date).getDate()}
        </span>
      </button>
    ))}

  </div>

  {/* ⏰ Time Slots */}
  {selectedDate && (
    <div className="mt-6">

      <p className="font-medium mb-3 text-gray-600">
        Available Time
      </p>

      <div className="flex flex-wrap gap-3">

        {slotsData
          .find((d) => d.date === selectedDate)
          ?.slots.map((slot) => (
            <button
              key={slot._id}
              disabled={tokens < 1 || slot.isBooked}
              onClick={() => setSelectedTime(slot._id)}
              className={`btn btn-sm transition-all duration-200
                ${
                  slot.isBooked
                    ? "btn-disabled"
                    : selectedTime === slot._id
                    ? "btn-primary scale-105 shadow-md"
                    : "btn-outline hover:btn-primary"
                }`}
            >
              {slot.time}
            </button>
          ))}

      </div>

    </div>
  )}

  {/* 🚀 Book Button */}
  <div className="mt-8">
    <button
      disabled={!selectedDate || !selectedTime}
      onClick={() =>
        onBook({ date: selectedDate, slotId: selectedTime })
      }
      className="btn btn-primary w-full md:w-auto px-8 text-base shadow-md hover:shadow-lg transition-all duration-300"
    >
      Book Appointment
    </button>
  </div>

</div>
  );
}