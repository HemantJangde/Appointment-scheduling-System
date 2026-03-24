import { useEffect, useState } from "react";
import axios from "axios";

export default function useSlots(doctorId) {
  const [slotsData, setSlotsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSlots = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/patient/available-slots/${doctorId}`,
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      );

      setSlotsData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch slots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (doctorId) fetchSlots();
  }, [doctorId]);

  return { slotsData, loading, error, refetch: fetchSlots };
}