import React, { useEffect, useState } from "react";
// import API from "../services/api";
import { FaClock, FaUser, FaEnvelope } from "react-icons/fa";
import { toast } from "react-hot-toast";
import API from "../../services/api";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  console.log(appointments);
  

  const fetchAppointments = async () => {
    try {
      const { data } = await API.get("/doctor/appointments");
      setAppointments(data);
    } catch (error) {
      toast.error("Failed to fetch appointments!");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const todaysAppointments = appointments.filter((a) => a.date === today);

  const statusColor = (status) => {
    if (status === "booked") return "badge badge-primary";
    if (status === "completed") return "badge badge-success";
    if (status === "canceled") return "badge badge-error";
    return "badge badge-outline";
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 space-y-10">

      {/* 🔹 Today’s Appointments */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Today’s Appointments</h2>
          <span className="badge badge-primary">{todaysAppointments.length} Today</span>
        </div>

        {todaysAppointments.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No appointments today</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {todaysAppointments.map((appt) => (
              <div
                key={appt._id}
                className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <FaUser className="text-gray-400" />
                  <p className="font-medium text-gray-800">{appt.patient.name}</p>
                </div>
                <div className="flex items-center gap-3 text-gray-500 text-sm">
                  <FaEnvelope />
                  <span>{appt.patient.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500 text-sm">
                  <FaClock />
                  <span>{appt.time}</span>
                </div>
                <div className="self-start">
                  <span className={`${statusColor(appt.status)} px-3 py-1 rounded-full text-xs`}>
                    {appt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔹 All Appointments Table */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">All Appointments</h2>
          <span className="badge badge-primary badge-outline">Total: {appointments.length}</span>
        </div>

        {appointments.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No appointments found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Patient</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt, index) => (
                  <tr key={appt._id} className="hover">
                    <td>{index + 1}</td>
                    <td className="font-medium">{appt.patient?.name || "N/A"}</td>
                    <td>{appt.patient?.email || "N/A"}</td>
                    <td>{appt.patient?.phone || "N/A"}</td>
                    <td>{appt.date}</td>
                    <td>{appt.time}</td>
                    <td>
                      <span className={`${statusColor(appt.status)} badge-outline`}>
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}