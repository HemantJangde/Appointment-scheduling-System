import React, { useEffect, useState } from "react";
import { getUser, logout } from "../utils/auth";
import ManageDoctor from "../pages/Doctor/ManageDoctor"
import API from "../services/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  FaUserMd,
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DoctorAppointments from "./Doctor/DoctorAppointments";
import toast from "react-hot-toast";

export default function DoctorDashboard() {
  const user = getUser();


    const handleDelete = async (date) => {
      if (!window.confirm("Delete this availability?")) return;
  
      try {
        await API.delete(`/doctor/delete-availability/${date}`);
        fetchAvailability();
        toast.success("added successfully Removed")
      } catch (error) {
            toast.error("Failed to Removed !");
      }
    };
  
      const handleEdit = (item) => {
      setEditingId(item._id);
    };

  const [appointments, setAppointments] = useState([]);
  const [availability, setAvailability] = useState([]);
    const [tokens, setTokens] = useState(0);

  const today = new Date().toISOString().split("T")[0];

  const fetchData = async () => {
    const appt = await API.get("/doctor/appointments");
    const avail = await API.get("/doctor/my-slots");

    setAppointments(appt.data);
    setAvailability(avail.data);
  };

    // 🔹 Fetch Tokens
  const fetchTokens = async () => {
    try {
      const { data } = await API.get("/doctor/my-tokens");
      setTokens(data.tokens);
    } catch {
      toast.error("Failed to load tokens");
    }
  };

  useEffect(() => {
    fetchData();
    fetchTokens()
  }, []);

  const todaysAppointments = appointments.filter((a) => a.date === today);

  const totalAppointments = appointments.length;

  const totalSlots = availability.reduce(
    (sum, item) => sum + item.slots.length,
    0,
  );

  const bookedSlots = availability.reduce(
    (sum, item) => sum + item.slots.filter((s) => s.isBooked).length,
    0,
  );

  const availableSlots = totalSlots - bookedSlots;

  const chartData = availability.map((item) => ({
    date: item.date,
    slots: item.slots.length,
  }));
  // 🔹 Withdraw (UI only for now)
  const handleWithdraw = () => {
    toast.success("Withdraw request sent (coming soon)");
  };
  return (
    <div className="min-h-screen bg-gray-100">
  <div className="bg-green-100 text-green-800 p-5 rounded-2xl flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Total Earnings</h3>
          <p className="text-2xl font-bold mt-1">🎟 {tokens} Tokens</p>
        </div>

        <button
          onClick={handleWithdraw}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Withdraw
        </button>
      </div>
      <div className="max-w-7xl mx-auto p-6">
        {/* 🔹 Header */}
        <div className="flex justify-between items-center mb-8">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <img
              src={
                user?.image && user.image !== ""
                  ? user.image
                  : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?_=20150327203541"
              }
              alt="Doctor"
              className="w-14 h-14 rounded-full object-cover border"
            />

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Dr. {user?.name}
              </h1>
              <p className="text-gray-500 text-sm">Manage your dashboard</p>
            </div>
          </div>

          {/* RIGHT */}
        
        </div>

        {/* 🔹 Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard
            icon={<FaCalendarCheck />}
            title="Appointments"
            value={totalAppointments}
            color="bg-blue-500"
          />

          <StatCard
            icon={<FaClock />}
            title="Total Slots"
            value={totalSlots}
            color="bg-purple-500"
          />

          <StatCard
            icon={<FaCheckCircle />}
            title="Booked"
            value={bookedSlots}
            color="bg-red-500"
          />

          <StatCard
            icon={<FaUserMd />}
            title="Available"
            value={availableSlots}
            color="bg-green-500"
          />
        </div>

        {/* 🔹 Today Appointments */}
      

        {/* 🔹 Chart */}
        <div className="mt-10 bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Slots Overview</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="slots" />
            </BarChart>
          </ResponsiveContainer>
        </div>
<DoctorAppointments/>

      

        <ManageDoctor/>
      </div>
    </div>
  );
}

/* 🔹 Reusable Stat Card */
function StatCard({ icon, title, value, color }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow flex items-center gap-4 hover:shadow-lg transition">
      <div className={`${color} text-white p-3 rounded-xl text-xl`}>{icon}</div>

      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>
    </div>
  );
}
