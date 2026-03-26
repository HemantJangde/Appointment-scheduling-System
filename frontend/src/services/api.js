// src/services/api.js
import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api", // change if needed
  baseURL: "https://appointment-scheduling-system-f160.onrender.com/api", // change if needed

});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = ` ${token}`;
  }
  return req;
});
export default API;