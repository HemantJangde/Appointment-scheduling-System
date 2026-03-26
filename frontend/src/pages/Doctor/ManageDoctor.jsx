import { useEffect, useState } from "react";
// import API from "../../services/api";
// import DoctorSidebar from "../../components/doctor/DoctorSidebar";
import toast from "react-hot-toast";
import API from "../../services/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import AddAvailability from "./AddAvailability";

function DoctorAvailabilityList() {
  const [availability, setAvailability] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const totalSlots = availability.reduce(
    (sum, item) => sum + item.slots.length,
    0,
  );

  const bookedSlots = availability.reduce(
    (sum, item) => sum + item.slots.filter((slot) => slot.isBooked).length,
    0,
  );

  const availableSlots = totalSlots - bookedSlots;

  const fetchAvailability = async () => {
    try {
      const { data } = await API.get("/doctor/my-slots");
      setAvailability(data);
    } catch (error) {
      console.log(error);

    toast.error("Failed to fetch availability!");
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

const handleDelete = async (date) => {
  if (!window.confirm("Delete this availability?")) return;

  try {
    const { data } = await API.delete(
      `/doctor/delete-availability/${date}`
    );

    toast.success(data.message || "Availability removed");
    fetchAvailability();

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to remove"
    );
  }
};
    const handleEdit = (item) => {
    setEditingId(item._id);
  };



  const handleUpdate = async (id) => {
    try {
      await API.put(`/doctor/update-availability/${id}`, {
        startTime,
        endTime,
      });

      setEditingId(null);
      setStartTime("");
      setEndTime("");

      fetchAvailability();
       toast.success("Availability updated successfully!");
    } catch (error) {
      
    toast.error("Update failed!");
    }
  };

    useEffect(()=>{
    fetchAvailability()},[handleUpdate]
)


  return (
<div className="p-4 md:p-6">

  {/* 🔥 STATS CARDS */}
 


  {/* 📅 AVAILABILITY LIST */}
  <div className="bg-base-100 shadow rounded-2xl p-4 md:p-6">
    <h2 className="text-xl font-semibold mb-4">Your Availability</h2>

    <AddAvailability/>

    {availability.length === 0 ? (
      <p className="text-gray-500 text-center py-10">
        No availability added
      </p>
    ) : (
      <div className="space-y-6">

        {availability.map((item) => (
          <div
            key={item._id}
            className="border-gray-300 rounded-xl p-4 hover:shadow transition"
          >

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
              
              <h3 className="font-semibold text-lg">
                {item.date}
              </h3>

              <div className="flex gap-2">
                {/* <button
                  onClick={() => handleEdit(item)}
                  className="btn btn-sm btn-outline"
                >
                  <FaEdit />
                </button> */}

                <button
                  onClick={() => handleDelete(item.date)}
                  className="btn btn-sm btn-error text-white"
                >
                  <FaTrash />
                </button>
              </div>

            </div>


            {/* 🔄 EDIT MODE */}
            {editingId === item._id ? (
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="input input-bordered"
                />

                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="input input-bordered"
                />

                <button
                  onClick={() => handleUpdate(item._id)}
                  className="btn btn-success"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditingId(null)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>

              </div>
            ) : (
              
              /* 🟢 SLOTS GRID */
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {item.slots.map((slot, i) => (
                  <div
                    key={i}
                    className={`text-center px-2 py-2 rounded-lg text-sm font-medium
                      ${
                        slot.isBooked
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                  >
                    {slot.time}
                  </div>
                ))}
              </div>

            )}

          </div>
        ))}

      </div>
    )}
  </div>

</div>
   
  );
}

export default DoctorAvailabilityList;