import React, { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function PatientProfileEdit() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    bloodGroup: "",
    height: "",
    weight: "",
    age: "",
    gender: "",
    address: "",
    image: "",
  });

  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch profile
  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/patient/profile");
      setProfile({
        ...data.data,
      });
      setPreviewImage(data.data.image || "");
    } catch (error) {
      toast.error("Failed to fetch profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle input change
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

  // Submit profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      for (let key in profile) {
        if (profile[key] !== null && profile[key] !== undefined) {
          formData.append(key, profile[key]);
        }
      }

      const { data } = await API.put("/patient/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfile(data.data);
      setPreviewImage(data.data.image || "");
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed!");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 min-h-screen">
      <div className="bg-white rounded-3xl p-8 flex flex-col md:flex-row gap-10">
        {/* 🔹 Left Panel: Image & Info */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:w-1/3 flex flex-col items-center md:items-start gap-5">
          {/* Profile Image */}
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

          {/* Name */}
          <h2 className="text-2xl font-bold text-gray-800 text-center md:text-left">
            {profile.name}
          </h2>

          {/* Blood Group Badge */}
          {profile.bloodGroup && (
            <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full font-medium">
              {profile.bloodGroup}
            </span>
          )}

          {/* Info Section */}
          <div className="w-full space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-medium text-gray-800">📧 Email:</span>{" "}
              {profile.email}
            </p>
            <p>
              <span className="font-medium text-gray-800">📞 Phone:</span>{" "}
              {profile.phone}
            </p>
            <p>
              <span className="font-medium text-gray-800">📏 Height:</span>{" "}
              {profile.height} cm
            </p>
            <p>
              <span className="font-medium text-gray-800">⚖ Weight:</span>{" "}
              {profile.weight} kg
            </p>
            <p>
              <span className="font-medium text-gray-800">🎂 Age:</span>{" "}
              {profile.age}
            </p>
            <p>
              <span className="font-medium text-gray-800">👤 Gender:</span>{" "}
              {profile.gender}
            </p>
            {/* <p>
              <span className="font-medium text-gray-800">📍 Address:</span>{" "}
              {profile.address}
            </p> */}
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

          {/* Phone */}
          <div className="form-control">
            <label className="label font-semibold">Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone || ""}
              onChange={handleChange}
              className="input input-bordered input-md w-full"
            />
          </div>

          {/* Blood Group */}
          <div className="form-control">
            <label className="label font-semibold">Blood Group</label>
            <select
              name="bloodGroup"
              value={profile.bloodGroup || ""}
              onChange={handleChange}
              className="input input-bordered input-md w-full"
            >
              <option value="">Select</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          {/* Height */}
          <div className="form-control">
            <label className="label font-semibold">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={profile.height || ""}
              onChange={handleChange}
              className="input input-bordered input-md w-full"
            />
          </div>

          {/* Weight */}
          <div className="form-control">
            <label className="label font-semibold">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={profile.weight || ""}
              onChange={handleChange}
              className="input input-bordered input-md w-full"
            />
          </div>

          {/* Age */}
          <div className="form-control">
            <label className="label font-semibold">Age</label>
            <input
              type="number"
              name="age"
              value={profile.age || ""}
              onChange={handleChange}
              className="input input-bordered input-md w-full"
            />
          </div>

          {/* Gender */}
          <div className="form-control">
            <label className="label font-semibold">Gender</label>
            <select
              name="gender"
              value={profile.gender || ""}
              onChange={handleChange}
              className="input input-bordered input-md w-full"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Address */}
          {/* <div className="form-control sm:col-span-2">
            <label className="label font-semibold">Address</label>
            <textarea
              name="address"
              value={profile.address || ""}
              onChange={handleChange}
              className="textarea textarea-bordered w-full resize-none h-24"
            />
          </div> */}

          {/* Submit */}
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