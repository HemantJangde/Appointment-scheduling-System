import React, { useEffect, useState } from "react";
// import API from "../services/api";
// import { toast } from "react-toastify";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function DoctorProfileEdit() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    qualification: "",
    specialization: "",
    experience: "",
    licenseNumber: "",
    address: "",
    password: "",
    image: "",
  });

  const [previewImage, setPreviewImage] = useState(""); // preview before upload
  const [loading, setLoading] = useState(false);

  // Fetch profile
  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/doctor/profile");
      setProfile({
        ...data.data,
        password: "", // don't prefill password
      });
      setPreviewImage(data.data.image || "");
    } catch (error) {
      toast.error("Failed to fetch profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfile({ ...profile, image: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  // Submit updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      for (let key in profile) {
        if (profile[key]) formData.append(key, profile[key]);
      }

      const { data } = await API.put("/doctor/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfile({ ...profile, password: "" });
      setPreviewImage(data.data.image || "");
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed!");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6  min-h-screen">
      <div className="bg-white rounded-3xl  p-8 flex flex-col md:flex-row gap-10">
        {/* 🔹 Left Panel: Profile Image & Basic Info */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:w-1/3 flex flex-col items-center md:items-start gap-5">

  {/* 🔹 Profile Image */}
  <div className="relative group">
    {previewImage ? (
      <img
        src={previewImage}
        alt="Profile"
        className="w-40 h-40 object-cover rounded-full border-4 border-blue-500 shadow-md transition"
      />
    ) : (
      <div className="w-40 h-40 flex items-center justify-center bg-gray-200 rounded-full border-4 border-blue-500">
        <span className="text-gray-500 font-semibold text-sm">
          No Image
        </span>
      </div>
    )}

    {/* Upload Button */}
    <label className="absolute bottom-2 right-2 bg-blue-600 text-white px-3 py-1 text-xs rounded-full cursor-pointer shadow hover:bg-blue-700 transition">
      Change
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </label>
  </div>

  {/* 🔹 Name */}
  <h2 className="text-2xl font-bold text-gray-800 text-center md:text-left">
    {profile.name}
  </h2>

  {/* 🔹 Specialization Badge */}
  <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full font-medium">
    {profile.specialization}
  </span>

  {/* 🔹 Info Section */}
  <div className="w-full space-y-2 text-sm text-gray-600">

    <p><span className="font-medium text-gray-800">📧 Email:</span> {profile.email}</p>

    <p><span className="font-medium text-gray-800">🎓 Qualification:</span> {profile.qualification}</p>

    <p><span className="font-medium text-gray-800">🩺 Experience:</span> {profile.experience} years</p>

    <p><span className="font-medium text-gray-800">🪪 License:</span> {profile.licenseNumber}</p>

    <p><span className="font-medium text-gray-800">📍 Address:</span> {profile.address}</p>

  </div>

  {/* 🔹 Token Fee Highlight */}
  <div className="w-full bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg text-center font-semibold">
    🎟 Consultation Fee: {profile.fees || 200} Tokens
  </div>

</div>

        {/* 🔹 Right Panel: Form */}
        <form
          onSubmit={handleSubmit}
          className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div className="form-control">
            <label className="label font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="input input-bordered input-md w-full"
              required
            />
          </div>

          {/* Qualification */}
          {/* <div className="form-control">
        <label className="label font-semibold">Qualification</label>
        <input
          type="text"
          name="qualification"
          value={profile.qualification}
          onChange={handleChange}
          className="input input-bordered input-md w-full"
          required
        />
      </div> */}

          {/* Specialization */}
          <div className="form-control">
            <label className="label font-semibold">Fees</label>
            <input
              type="text"
              name="fees"
              value={profile.fees}
              onChange={handleChange}
              className="input input-bordered input-md w-full"
              required
            />
          </div>

          {/* Experience */}
          <div className="form-control">
            <label className="label font-semibold">Experience (years)</label>
            <input
              type="number"
              name="experience"
              value={profile.experience}
              onChange={handleChange}
              className="input input-bordered input-md w-full"
              min={0}
              required
            />
          </div>

          {/* License Number */}
          {/* <div className="form-control">
        <label className="label font-semibold">License Number</label>
        <input
          type="text"
          name="licenseNumber"
          value={profile.licenseNumber}
          onChange={handleChange}
          className="input input-bordered input-md w-full"
          required
        />
      </div> */}

          {/* Address */}
          <div className="form-control sm:col-span-2">
            <label className="label font-semibold">Address</label>
            <textarea
              name="address"
              value={profile.address}
              onChange={handleChange}
              className="textarea textarea-bordered w-full resize-none h-24"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2 flex justify-end mt-2">
            <button
              type="submit"
              className={`btn btn-primary btn-lg ${loading ? "loading" : ""}`}
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
