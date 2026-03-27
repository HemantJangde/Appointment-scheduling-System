import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import defaultUser from "../../assets/defaultUser.jpg";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [address, setAddress] = useState("");
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const { data } = await API.get("/patient/doctors"); // Your endpoint
        setDoctors(data);
        console.log(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch doctors ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const specializations = [
    "All",
    ...new Set(doctors.map((doc) => doc.specialization)),
  ];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSpecialization =
      filter === "All" || doc.specialization === filter;

    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase());

    const matchesAddress = doc.address
      ?.toLowerCase()
      .includes(address.toLowerCase());

    return matchesSpecialization && matchesSearch && matchesAddress;
  });
  const navigate = useNavigate();

 if (loading) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Skeleton Filter Bar */}
      <div className="bg-white/80 backdrop-blur-md shadow-md rounded-2xl p-4 md:p-6 mb-6 animate-pulse">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="h-12 bg-gray-200 rounded-xl w-full md:w-1/3"></div>
          <div className="h-12 bg-gray-200 rounded-xl w-full md:w-1/3"></div>
          <div className="h-12 bg-gray-200 rounded-xl w-full md:w-1/3"></div>
        </div>
      </div>

      {/* Skeleton Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-4 animate-pulse"
          >
            {/* Image */}
            <div className="w-full h-40 bg-gray-200 rounded-xl mb-4"></div>

            {/* Name */}
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>

            {/* Specialization */}
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>

            {/* Address */}
            <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>

            {/* Button */}
            <div className="h-10 bg-gray-200 rounded-xl"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

  return (
    <div className="relative w-full px-4 md:px-10 py-10 overflow-hidden">
      {/* 🌈 Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>

      {/* Glow Effects */}
      <div className="absolute w-[300px] h-[300px] bg-purple-300/20 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-[250px] h-[250px] bg-pink-300/20 blur-3xl rounded-full bottom-10 right-10"></div>

      <div className="relative z-10">
        {/* 🔍 Search + Filter */}
        <div className="w-full bg-white/80 backdrop-blur-md shadow-md rounded-2xl p-4 md:p-6 mb-6">
  
  <div className="flex flex-col md:flex-row md:items-center gap-4">
    
    {/* 🔍 Search Doctor */}
    <div className="flex items-center w-full md:w-1/3 bg-gray-100 rounded-xl px-3 h-12">
      <span className="text-gray-500 mr-2">🔍</span>
      <input
        type="text"
        placeholder="Search doctor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-transparent border-none w-full outline-none text-sm"
      />
    </div>

    {/* 📍 Search by City */}
    <div className="flex items-center w-full md:w-1/3 bg-gray-100 rounded-xl px-3 h-12">
      <span className="text-gray-500 mr-2">📍</span>
      <input
        type="text"
        placeholder="City (e.g. Bilaspur)"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="bg-transparent border-none w-full outline-none text-sm"
      />
    </div>

    {/* 🏥 Specialization Filter */}
    <div className="flex items-center w-full md:w-1/3">
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full h-12 rounded-xl border border-gray-300 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        {specializations.map((spec, index) => (
          <option key={index} value={spec}>
            {spec}
          </option>
        ))}
      </select>
    </div>

  </div>
</div>

        {/* 🩺 Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredDoctors.map((doc) => (
            <div
              key={doc._id}
              onClick={() => navigate(`/doctor/${doc._id}`, { state: doc })}
              className="group relative  rounded-2xl p-[1px] bg-gradient-to-r from-indigo-400 to-pink-400 hover:scale-105 transition duration-300"
            >
              {/* Card */}
              <div className="bg-white rounded-2xl p-4 shadow-md group-hover:shadow-xl transition">
                {/* Image */}
                <div className="flex justify-center">
                  <img
                    src={doc.image || defaultUser}
                    alt={doc.name}
                    className="h-32 w-32 object-cover rounded-full border-4 border-white shadow"
                  />
                </div>

                {/* Info */}
                <div className="text-center mt-4">
                  {/* Name */}
                  <h2 className="text-lg font-semibold text-gray-800">
                    {doc.name}
                  </h2>

                  {/* Badge */}
                  <span className="inline-block mt-1 text-xs px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full">
                    {doc.specialization}
                  </span>

                  {/* Experience */}
                  <p className="text-sm text-gray-500 mt-2">
                    {doc.experience} years experience
                  </p>

                  {/* Address */}
                  <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                    📍 {doc.address}
                  </p>

                  {/* Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/doctor/${doc._id}`, { state: doc });
                    }}
                    className="mt-4 w-full h-10 rounded-xl bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ❌ No Results */}
        {filteredDoctors.length === 0 && (
          <p className="text-center text-gray-500 mt-12 text-lg">
            No doctors found 😔
          </p>
        )}
      </div>
    </div>
  );
}
