// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    try {
      const { data } = await API.get("/admin/all-patients");
      setPatients(data);
    } catch {
      toast.error("Failed to fetch patients ❌");
    }
  };

  const handleAddTokens = async () => {
    if (!userId || !amount) {
      return toast.error("Enter all fields");
    }

    try {
      const { data } = await API.post("/admin/add-tokens", {
        userId,
        amount: Number(amount),
      });

      toast.success(`Tokens updated: ${data.tokens}`);
      setUserId("");
      setAmount("");
      fetchPatients(); // refresh table
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding tokens");
    }
  };

  // 🔐 Logout
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out 👋");
    navigate("/login");
  };

  // 📡 Fetch Doctors
  const fetchDoctors = async () => {
    try {
      const { data } = await API.get("/admin/all-doctors");
      setDoctors(data);
      console.log(doctors);
    } catch (error) {
      toast.error("Failed to fetch doctors ❌");
    }
  };

  // 📡 Fetch Appointments (ignore errors)
  const fetchAppointments = async () => {
    try {
      const { data } = await API.get("/admin/all-appointments");
      setAppointments(data);
    } catch (error) {
      console.log("Appointments not working yet 🚧");
    }
  };
  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
    fetchPatients(); // ✅ NEW
  }, []);
  // 📊 Stats
  const approvedDoctors = doctors.filter((d) => d.status === "approved");
  const pendingDoctors = doctors.filter((d) => d.status === "pending");

  // ⚡ Actions
  const approveDoctor = async (id) => {
    try {
      await API.put(`/admin/approve-doctor/${id}`);
      toast.success("Doctor approved ");
      fetchDoctors();
    } catch {
      toast.error("Approve failed ");
    }
  };

  const rejectDoctor = async (id) => {
    try {
      await API.put(`/admin/reject-doctor/${id}`);
      toast.success("Doctor rejected ");
      fetchDoctors();
    } catch {
      toast.error("Reject failed ");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      {/* 🔝 Header */}
      {/* <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <button onClick={handleLogout} className="btn btn-error">
          Logout
        </button>
      </div> */}

      {/* 📊 Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="stat bg-base-100 shadow rounded-box">
          <div className="stat-title">Total Doctors</div>
          <div className="stat-value">{doctors.length}</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-box">
          <div className="stat-title">Approved</div>
          <div className="stat-value text-success">
            {approvedDoctors.length}
          </div>
        </div>

        <div className="stat bg-base-100 shadow rounded-box">
          <div className="stat-title">Pending</div>
          <div className="stat-value text-warning">{pendingDoctors.length}</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-box">
          <div className="stat-title">Appointments</div>
          <div className="stat-value text-info">{appointments.length}</div>
        </div>
      </div>

{/* 👤 Patient List */}
<div className="bg-base-100 p-6 rounded-xl shadow mt-8">

  <h2 className="text-xl font-semibold mb-4">
    Patients List
  </h2>

  {patients.length === 0 ? (
    <p className="text-gray-500">No patients found</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Tokens</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id} className="hover">

              <td className="font-medium">{patient.name}</td>
              <td>{patient.email}</td>
              <td>🎟 {patient.tokens || 0}</td>

              <td className="space-x-2">

                {/* Select patient */}
                <button
                  onClick={() => {
                    setUserId(patient._id);
                    toast("Patient selected");
                  }}
                  className="btn btn-xs btn-primary"
                >
                  Select
                </button>

                {/* Quick +1 token */}
                <button
                  onClick={async () => {
                    try {
                      await API.post("/admin/add-tokens", {
                        userId: patient._id,
                        amount: 100,
                      });
                      toast.success("100 Token added");
                      fetchPatients();
                    } catch {
                      toast.error("Failed");
                    }
                  }}
                  className="btn btn-xs btn-success"
                >
                  +100 Token
                </button>

              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )}
</div>

{/* 🎟 Token Management */}
<div className="bg-base-100 p-6 rounded-xl shadow mb-6">
  <h2 className="text-xl font-semibold mb-4">
    Add Tokens to Patient
  </h2>

  <div className="grid md:grid-cols-3 gap-3">

    <input
      type="text"
      placeholder="Patient ID"
      className="input input-bordered w-full"
      value={userId}
      onChange={(e) => setUserId(e.target.value)}
    />

    <input
      type="number"
      placeholder="Amount"
      className="input input-bordered w-full"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
    />

    <button
      onClick={handleAddTokens}
      className="btn btn-primary w-full"
    >
      Add Tokens
    </button>

  </div>
</div>

      {/* 🩺 Doctor Table */}
      <div className="bg-base-100 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Doctor Approval Requests</h2>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Specialization</th>
                <th>qualification</th>
                <th>address</th>
                <th>Status</th>
                <th>Tokens</th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {doctors.map((doc) => (
                <tr
                  key={doc._id}
                  onClick={() => {
                    setUserId(doc._id);
                    setRole("doctor");
                  }}
                  className="cursor-pointer hover"
                >
                  <td className="font-medium">{doc.name}</td>

                  <td>{doc.email}</td>

                  <td>{doc.specialization || "General"}</td>
                  <td>{doc.qualification}</td>
                  <td>{doc.address}</td>

                  <td>
                    <span
                      className={`badge ${
                        doc.status === "approved"
                          ? "badge-success"
                          : doc.status === "rejected"
                            ? "badge-error"
                            : "badge-warning"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td>🎟 {doc.tokens || 0}</td>
                  <td className="space-x-2">
                    <button
                      disabled={doc.status === "approved"}
                      onClick={() => approveDoctor(doc._id)}
                      className="btn btn-xs btn-success"
                    >
                      Approve
                    </button>

                    <button
                      disabled={doc.status === "rejected"}
                      onClick={() => rejectDoctor(doc._id)}
                      className="btn btn-xs btn-error"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
