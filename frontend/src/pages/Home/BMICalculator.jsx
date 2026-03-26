import { useState, useEffect } from "react";

// import { useEffect, useState } from "react";

const BMIDisplay = ({ bmi = 0 }) => {
  const [progress, setProgress] = useState(0);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (!bmi) return;

    // Progress (0–40 scale)
    const value = Math.min(Math.max(bmi, 10), 40);
    setProgress((value / 40) * 100);

    // Category
    if (bmi < 18.5) setCategory("Underweight");
    else if (bmi < 25) setCategory("Normal");
    else if (bmi < 30) setCategory("Overweight");
    else setCategory("Obese");
  }, [bmi]);

  const getColor = () => {
    if (category === "Normal") return "text-green-500";
    if (category === "Overweight") return "text-yellow-500";
    if (category === "Obese") return "text-red-500";
    return "text-blue-500";
  };

  const getProgressColor = () => {
    if (category === "Normal") return "progress-success";
    if (category === "Overweight") return "progress-warning";
    if (category === "Obese") return "progress-error";
    return "progress-info";
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* 🔢 Digital BMI Number */}
      <div className={`text-5xl font-bold ${getColor()}`}>{bmi || "--"}</div>

      {/* Category Badge */}
      {bmi && (
        <div className={`badge ${getProgressColor()} badge-lg`}>{category}</div>
      )}

      {/* Progress Bar */}
      <progress
        className={`progress w-full ${getProgressColor()}`}
        value={progress}
        max="100"
      ></progress>

      {/* Range Labels */}
      <div className="flex justify-between w-full text-xs opacity-60">
        <span>Under</span>
        <span>Normal</span>
        <span>Over</span>
        <span>Obese</span>
      </div>
    </div>
  );
};

// export default BMIDisplay;

/* 🔹 MAIN COMPONENT */
const BMICalculator = () => {
  const [useCm, setUseCm] = useState(true);
  const [heightCm, setHeightCm] = useState("");
  const [feet, setFeet] = useState("");
  const [inch, setInch] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    let height;

    if (useCm) {
      if (!heightCm || !weight) return;
      height = heightCm / 100;
    } else {
      if (!feet || !inch || !weight) return;
      height = (feet * 12 + Number(inch)) * 0.0254;
    }

    const value = (weight / (height * height)).toFixed(1);
    setBmi(value);

    if (value < 18.5) setCategory("Underweight");
    else if (value < 25) setCategory("Normal");
    else if (value < 30) setCategory("Overweight");
    else setCategory("Obese");
  };

  const getBadgeColor = () => {
    if (category === "Normal") return "badge-success";
    if (category === "Overweight") return "badge-warning";
    if (category === "Obese") return "badge-error";
    return "badge-info";
  };
  const clearData = () => {
  setHeightCm("");
  setFeet("");
  setInch("");
  setWeight("");
  setBmi(null);
  setCategory("");
};

  return (
    <section className="bg-gray-100 min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* LEFT CARD */}
        <div className="card bg-base-100 shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6">Check Your BMI</h2>

          {/* Toggle */}
          <div className="form-control mb-4">
            <label className="label cursor-pointer justify-start gap-4">
              <span className="label-text">Use CM</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={useCm}
                onChange={() => setUseCm(!useCm)}
              />
            </label>
          </div>

          {/* Height */}
          {useCm ? (
            <input
              type="number"
              placeholder="Height (cm)"
              className="input input-bordered w-full mb-4"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
            />
          ) : (
            <div className="flex gap-4 mb-4">
              <input
                type="number"
                placeholder="Feet"
                className="input input-bordered w-1/2"
                value={feet}
                onChange={(e) => setFeet(e.target.value)}
              />
              <input
                type="number"
                placeholder="Inches"
                className="input input-bordered w-1/2"
                value={inch}
                onChange={(e) => setInch(e.target.value)}
              />
            </div>
          )}

          {/* Weight */}
          <input
            type="number"
            placeholder="Weight (kg)"
            className="input input-bordered w-full mb-6"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          {/* Button */}
         <div className="flex gap-3 mt-4">
  <button
    onClick={calculateBMI}
    className="btn btn-primary flex-1"
  >
    Calculate BMI
  </button>

  <button
    onClick={clearData}
    className="btn btn-outline btn-error flex-1"
  >
    Clear
  </button>
</div>

          {/* Result */}
          {bmi && (
            <div className="mt-6 text-center">
              <p className="text-xl font-bold">{bmi}</p>
              <span className={`badge ${getBadgeColor()} mt-2`}>
                {category}
              </span>
            </div>
          )}
        </div>

        {/* RIGHT CARD */}
        <div className="card bg-base-100 shadow-xl p-6 text-center">
          <h2 className="text-lg font-semibold mb-4">Health Overview</h2>
          <BMIDisplay bmi={bmi} />
          <div className="mt-6 space-y-3 text-left">
            <div>
              <p className="text-sm opacity-70">Healthy BMI range</p>
              <p className="font-semibold">18.5 - 24.9</p>
            </div>

            <div>
              <p className="text-sm opacity-70">Status</p>
              <p className="font-semibold">{category || "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BMICalculator;
