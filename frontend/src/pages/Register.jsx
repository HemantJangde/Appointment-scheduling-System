// src/pages/Register.jsx
import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Register() {
  const [role, setRole] = useState("patient");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    qualification: "",
    specialization: "",
    experience: "",
    licenseNumber: "",
    address: "",
    fees: "", // ✅ NEW
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = "";

      if (role === "patient") {
        url = "/auth/register-patient";

        const res = await API.post(url, form);

        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("user", JSON.stringify(res.data.user));

          toast.success("Welcome 🎉");
          window.location.href = "/patient-dashboard";
        }
      } else {
        // ✅ DOCTOR REGISTER
        url = "/auth/register-doctor"; // 🔥 FIXED

        const formData = new FormData();

        Object.keys(form).forEach((key) => {
          formData.append(key, form[key]);
        });

        if (image) {
          formData.append("image", image); // 🔥 IMPORTANT
        }
        if (role === "doctor" && !form.fees) {
          return toast.error("Please enter consultation fee");
        }
        await API.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Registered! Wait for admin approval ⏳");
        window.location.href = "/login";
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Error ❌");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <form
        onSubmit={handleSubmit}
        className="card w-96 bg-base-100 shadow-xl p-6"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {/* Role Toggle */}
        <div className="flex justify-center mb-4 gap-2">
          <button
            type="button"
            className={`btn ${role === "patient" ? "btn-primary" : ""}`}
            onClick={() => setRole("patient")}
          >
            Patient
          </button>
          <button
            type="button"
            className={`btn ${role === "doctor" ? "btn-primary" : ""}`}
            onClick={() => setRole("doctor")}
          >
            Doctor
          </button>
        </div>

        {/* Common Fields */}
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered mb-2"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="input input-bordered mb-2"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered mb-2"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Patient Only */}
        {role === "patient" && (
          <input
            type="text"
            placeholder="Phone"
            className="input input-bordered mb-2"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        )}

        {/* Doctor Only */}
        {role === "doctor" && (
          <>
            <div className="mb-2">
              <input type="file" onChange={handleImageChange} />

              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="w-20 h-20 rounded-full mt-2 object-cover"
                />
              )}
            </div>
            <input
              type="text"
              placeholder="Qualification"
              className="input input-bordered mb-2"
              onChange={(e) =>
                setForm({ ...form, qualification: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Specialization"
              className="input input-bordered mb-2"
              onChange={(e) =>
                setForm({ ...form, specialization: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Experience"
              className="input input-bordered mb-2"
              onChange={(e) => setForm({ ...form, experience: e.target.value })}
            />

            <input
              type="text"
              placeholder="License Number"
              className="input input-bordered mb-2"
              onChange={(e) =>
                setForm({ ...form, licenseNumber: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Address"
              className="input input-bordered mb-2"
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            <input
              type="number"
              placeholder="Consultation Fee (Tokens)"
              className="input input-bordered mb-2"
              onChange={(e) => setForm({ ...form, fees: e.target.value })}
            />
          </>
        )}

        <button className="btn btn-primary w-full mt-3">
          Register as {role}
        </button>
      </form>
    </div>
  );
}
