import { useEffect, useState } from "react";
import API from "../services/api";
// import API from "../api";

export default function PatientDashboard() {
  const [tokens, setTokens] = useState(0);

  const fetchTokens = async () => {
    const { data } = await API.get("/patient/my-tokens");
    setTokens(data.tokens);
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">Patient Dashboard</h1>

      <div className="mt-4 p-4 bg-blue-100 rounded">
        <h2 className="text-lg">Your Tokens: {tokens}</h2>
      </div>
    </div>
  );
}