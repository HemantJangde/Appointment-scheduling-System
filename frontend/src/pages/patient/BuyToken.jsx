import React, { useState ,useEffect} from "react";
import { FaCreditCard, FaGooglePay, FaWallet } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import API from "../../services/api";
import PatientDashboard from "../PatientDashboard";

export default function BuyToken() {
  const [tokens, setTokens] = useState(0);
  const [buyAmount, setBuyAmount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("card");



  const handlePayment = () => {
    if (buyAmount < 1) {
      toast.error("Enter valid tokens");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setTokens(tokens + parseInt(buyAmount));
      setLoading(false);
      toast.success("Payment Successful 🎉");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 md:px-10 py-10">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        
        {/* LEFT: PAYMENT FORM */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold mb-2">Secure Payment</h1>
          <p className="text-gray-500 mb-6">
            Complete your purchase securely
          </p>

          {/* Token Input */}
          <div className="mb-5">
            <label className="block mb-2 font-medium">Tokens</label>
            <input
              type="number"
              min="1"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Payment Methods */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button
              onClick={() => setMethod("card")}
              className={`p-3 rounded-lg border text-sm ${
                method === "card"
                  ? "bg-blue-100 border-blue-500"
                  : "hover:bg-gray-100"
              }`}
            >
              <FaCreditCard className="mx-auto mb-1" />
              Card
            </button>

            <button
              onClick={() => setMethod("upi")}
              className={`p-3 rounded-lg border text-sm ${
                method === "upi"
                  ? "bg-green-100 border-green-500"
                  : "hover:bg-gray-100"
              }`}
            >
              <FaGooglePay className="mx-auto mb-1" />
              UPI
            </button>

            <button
              onClick={() => setMethod("wallet")}
              className={`p-3 rounded-lg border text-sm ${
                method === "wallet"
                  ? "bg-purple-100 border-purple-500"
                  : "hover:bg-gray-100"
              }`}
            >
              <FaWallet className="mx-auto mb-1" />
              Wallet
            </button>
          </div>

          {/* Dynamic Form */}
          {method === "card" && (
            <div className="space-y-3 mb-6">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full border px-3 py-2 rounded-lg"
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-1/2 border px-3 py-2 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-1/2 border px-3 py-2 rounded-lg"
                />
              </div>
              <input
                type="text"
                placeholder="Card Holder Name"
                className="w-full border px-3 py-2 rounded-lg"
              />
            </div>
          )}

          {method === "upi" && (
            <div className="mb-6">
              <input
                type="text"
                placeholder="Enter UPI ID"
                className="w-full border px-3 py-2 rounded-lg"
              />
            </div>
          )}

          {method === "wallet" && (
            <div className="mb-6 text-gray-600 text-sm">
              Select wallet in next step
            </div>
          )}

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            {loading ? "Processing..." : `Pay ₹${buyAmount * 10}`}
          </button>

          <p className="text-xs text-gray-400 mt-4">
            🔒 Secure demo payment UI
          </p>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2">
            <span>Tokens</span>
            <span>{buyAmount}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Price per token</span>
            <span>₹2</span>
          </div>

          <div className="border-t my-4"></div>

          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>₹{buyAmount * 2}</span>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            This is a demo payment page UI. No real transactions are processed.
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg text-green-700 text-sm">
           <PatientDashboard/>
          </div>
        </div>
      </div>
    </div>
  );
}