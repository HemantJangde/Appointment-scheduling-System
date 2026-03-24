import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import defaultUser from '../../assets/defaultUser.jpg'

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

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

  const matchesSearch = doc.name
    .toLowerCase()
    .includes(search.toLowerCase());

  return matchesSpecialization && matchesSearch;
});
const navigate = useNavigate();

  if (loading) {
    return <p className="text-center mt-10">Loading doctors...</p>;
  }

  return (
   <div className="w-full px-4 md:px-10 py-10">

  {/* 🔍 Search + Filter Card */}
  <div className="card bg-base-100 shadow-md mb-8 p-5">
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

      {/* Search */}
      <input
        type="text"
        placeholder="Search doctor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered w-full md:w-1/3"
      />

      {/* Filter */}
      <div className="flex items-center gap-2">
        <span className="font-medium">Specialization:</span>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="select select-bordered"
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
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

    {filteredDoctors.map((doc) => (
      <div
        key={doc._id}
        onClick={() => navigate(`/doctor/${doc._id}`, { state: doc })}
        className="card bg-base-100 shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-2"
      >

        {/* Image */}
        <figure className="px-4 pt-4">
          <img
            src={doc.image || defaultUser}
            alt={doc.name}
            className="rounded-xl h-40 w-full object-contain"
          />
        </figure>

        {/* Info */}
        <div className="card-body items-center text-center p-4">

        

          {/* Name */}
          <h2 className="card-title text-lg mt-2">
            {doc.name}
          </h2>

          {/* Specialization */}
          <p className="text-sm text-gray-500">
            {doc.specialization}
          </p>

          {/* Experience */}
          <p className="text-xs text-gray-400">
            {doc.experience} yrs experience
          </p>

          {/* Address */}
          <p className="text-xs text-gray-400 line-clamp-1">
            📍 {doc.address}
          </p>

          {/* Action */}
          <div className="card-actions mt-3">
            <button className="btn btn-primary btn-sm">
              Book Appointment
            </button>
          </div>

        </div>
      </div>
    ))}

  </div>

  {/* ❌ No Results */}
  {filteredDoctors.length === 0 && (
    <p className="text-center text-gray-500 mt-10">
      No doctors found 😔
    </p>
  )}

</div>
  );
}