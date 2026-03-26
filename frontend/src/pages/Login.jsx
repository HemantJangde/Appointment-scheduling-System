import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { LoaderFour } from "../components/ui/loader";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success(res.data.message || "Login successful 🎉");

      if (res.data.role === "patient") {
        navigate("/");
      } else if (res.data.role === "doctor") {
        navigate("/doctor-dashboard");
      } else {
        navigate("/admin-dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      
      {/* 🌈 Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"></div>

      {/* Glow Effects */}
      <div className="absolute w-[400px] h-[400px] bg-purple-300/30 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-[300px] h-[300px] bg-pink-300/30 rounded-full blur-3xl bottom-10 right-10"></div>

      {/* 🧊 Glass Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-[340px] p-8 rounded-2xl backdrop-blur-xl bg-white/60 border border-white/40 shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back 
        </h2>
        <p className="text-center text-gray-500 text-sm mt-2 mb-6">
          Login to continue your journey
        </p>

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          className="w-full h-12 px-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-400 bg-white/70"
          required
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* Password */}
        <div className="relative mt-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full h-12 px-4 pr-10 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-400 bg-white/70"
            required
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* Toggle Icon */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        {/* Forgot */}
        <div className="text-right mt-2">
          <span className="text-sm text-gray-500 hover:underline cursor-pointer">
            Forgot password?
          </span>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full h-12 rounded-xl bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition"
        >
          Login
        </button>

        {/* Register */}
        <p className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-500 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>

      {/* 🔥 FULL SCREEN LOADING */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-md">
          <LoaderFour />
          <p className="mt-4 text-gray-700 font-medium">
            Logging you in...
          </p>
        </div>
      )}
    </div>
  );
}