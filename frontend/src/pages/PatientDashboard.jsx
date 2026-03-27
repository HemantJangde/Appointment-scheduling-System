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

  return        <h3 className="text-lg">Your Tokens: {tokens}</h3>
}