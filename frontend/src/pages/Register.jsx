import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { LoaderFour } from "../components/ui/loader";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [role, setRole] = useState("patient");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [passwordStrength, setPasswordStrength] = useState({
    level: "",
    color: "",
  });

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
    fees: "",
  });

  // 🔹 Handle Image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🔹 Password strength check
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 1) setPasswordStrength({ level: "Weak", color: "red" });
    else if (strength <= 3)
      setPasswordStrength({ level: "Medium", color: "orange" });
    else setPasswordStrength({ level: "Strong", color: "green" });
  };

  // 🔹 Validate fields before submit
  const validateFields = () => {
    if (!form.name || !form.email || !form.password) {
      toast.error("Name, Email, and Password are required");
      return false;
    }

    if (role === "patient" && !form.phone) {
      toast.error("Phone number is required for patients");
      return false;
    }

    if (role === "doctor") {
      const doctorFields = [
        "qualification",
        "specialization",
        "experience",
        "licenseNumber",
        "address",
        "fees",
      ];
      for (let field of doctorFields) {
        if (!form[field]) {
          toast.error(`Field "${field}" is required for doctors`);
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setLoading(true);
    try {
      let url = "";
      if (role === "patient") {
        url = "/auth/register-patient";
        const res = await API.post(url, form);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("Welcome 🎉");
        window.location.href = "/patient-dashboard";
      } else {
        url = "/auth/register-doctor";
        const formData = new FormData();
        Object.keys(form).forEach((key) => formData.append(key, form[key]));
        if (image) formData.append("image", image);

        await API.post(url, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        toast.success("Registered! Wait for approval ⏳");
        window.location.href = "/login";
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "You have to wait for admin approval"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex py-10 items-center justify-center min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-300/30 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-[300px] h-[300px] bg-pink-300/30 blur-3xl rounded-full bottom-10 right-10"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-[350px] p-8 rounded-2xl backdrop-blur-xl bg-white/60 border border-white/40 shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Account 🚀
        </h2>

        {/* Role Toggle */}
        <div className="flex mt-4 bg-gray-200 rounded-full p-1">
          <button
            type="button"
            onClick={() => setRole("patient")}
            className={`w-1/2 py-2 rounded-full text-sm font-medium ${
              role === "patient" ? "bg-indigo-500 text-white" : "text-gray-600"
            }`}
          >
            Patient
          </button>
          <button
            type="button"
            onClick={() => setRole("doctor")}
            className={`w-1/2 py-2 rounded-full text-sm font-medium ${
              role === "doctor" ? "bg-indigo-500 text-white" : "text-gray-600"
            }`}
          >
            Doctor
          </button>
        </div>

        {/* Common Inputs */}
        <input
          type="text"
          placeholder="Full Name"
          className="mt-4 w-full h-12 px-4 rounded-xl border bg-white/70"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="mt-3 w-full h-12 px-4 rounded-xl border bg-white/70"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Password */}
        <div className="relative mt-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full h-12 px-4 pr-10 rounded-xl border bg-white/70"
            onChange={(e) => {
              const pwd = e.target.value;
              setForm({ ...form, password: pwd });
              checkPasswordStrength(pwd);
            }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
          {form.password && (
            <p
              className="mt-1 text-sm font-medium"
              style={{ color: passwordStrength.color }}
            >
              Password Strength: {passwordStrength.level}
            </p>
          )}
        </div>

        {/* Patient */}
        {role === "patient" && (
          <input
            type="text"
            placeholder="Phone"
            className="mt-3 w-full h-12 px-4 rounded-xl border bg-white/70"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        )}

        {/* Doctor */}
        {role === "doctor" && (
          <>
            <input
              type="text"
              placeholder="Qualification"
              className="mt-3 w-full h-12 px-4 rounded-xl border bg-white/70"
              onChange={(e) =>
                setForm({ ...form, qualification: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Specialization"
              className="mt-3 w-full h-12 px-4 rounded-xl border bg-white/70"
              onChange={(e) =>
                setForm({ ...form, specialization: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Experience (years)"
              className="mt-3 w-full h-12 px-4 rounded-xl border bg-white/70"
              onChange={(e) =>
                setForm({ ...form, experience: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="License Number"
              className="mt-3 w-full h-12 px-4 rounded-xl border bg-white/70"
              onChange={(e) =>
                setForm({ ...form, licenseNumber: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Address"
              className="mt-3 w-full h-12 px-4 rounded-xl border bg-white/70"
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            <input
              type="number"
              placeholder="Consultation Fee"
              className="mt-3 w-full h-12 px-4 rounded-xl border bg-white/70"
              onChange={(e) => setForm({ ...form, fees: e.target.value })}
            />

            {/* Profile Image */}
            <div className="mt-4 w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Image
              </label>
              <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-400 transition bg-white/70">
                <span className="text-gray-500 text-sm">Click to upload image</span>
                <input type="file" className="hidden" onChange={handleImageChange} />
              </label>
              {preview && (
                <div className="flex items-center gap-3 mt-3">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-14 h-14 rounded-full object-cover border"
                  />
                  <p className="text-sm text-gray-600">Image selected</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Button */}
        <button className="mt-6 w-full h-12 rounded-xl bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition">
          Register as {role}
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500 font-semibold">
            Login
          </Link>
        </p>
      </form>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-md">
          <LoaderFour />
          <p className="mt-4 text-gray-700">Doctor have to wait for Admin Approval</p>
        </div>
      )}
    </div>
  );
}