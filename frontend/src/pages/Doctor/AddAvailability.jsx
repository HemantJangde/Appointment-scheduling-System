import { useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function AddAvailability({ onSuccess }) {
    const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
  startTime: "10:00", // ✅ 10 AM
  endTime: "12:00",   // ✅ 12 PM
  });

  const [loading, setLoading] = useState(false);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { date, startTime, endTime } = formData;

    if (!date || !startTime || !endTime) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await API.post("/doctor/add-availability", {
        date,
        startTime,
        endTime,
      });

      toast.success("Availability added successfully!");

      // Reset form
      setFormData({
        date: "",
        startTime: "",
        endTime: "",
      });

      // 🔥 optional callback (refresh parent data)
      if (onSuccess) onSuccess();

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error adding availability"
      );
    } finally {
      setLoading(false);
    }
  };

  return (<>
    <div>
      {/* 🔹 OPEN BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        + Add Availability
      </button>

      {/* 🔹 MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-fadeIn">

            {/* ❌ CLOSE BUTTON */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg"
            >
              ✕
            </button>

            {/* 🔹 TITLE */}
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Add Availability
            </h2>

            {/* 🔹 FORM */}
            <form
              onSubmit={(e) => {
                handleSubmit(e);
                setOpen(false); // close after submit
              }}
              className="space-y-4"
            >

              {/* Date */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Select Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Start Time */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* End Time */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? "Adding..." : "Save"}
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>

    </>
  );
}