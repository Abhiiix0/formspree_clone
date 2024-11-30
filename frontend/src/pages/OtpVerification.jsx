import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, setUser } = useAppContext();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [errorMessage, setErrorMessage] = useState("");

  // Handle OTP input change
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus on the next input field automatically if value is entered
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  // Handle key down (backspace and space handling)
  const handleKeyDown = (e, index) => {
    const newOtp = [...otp];

    if (e.key === "Backspace" || e.key === " ") {
      // If input is empty, move focus to the previous input
      if (!newOtp[index] && index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }

      // Clear the current input
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  // Handle form submission
  const onSubmit = async () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setErrorMessage("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/otp-verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user?.email, otp: otpCode }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("OTP verified successfully");

        // Redirect to dashboard
        navigate("/login");
      } else {
        toast.error(
          result?.message || "OTP verification failed. Please try again."
        );
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>

        {/* OTP Input Fields */}
        <div className="flex justify-center mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`w-12 h-12 text-center text-xl border rounded-md mx-1 focus:outline-none ${
                otp.join("").length !== 6 && errorMessage
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Verify OTP
        </button>

        {/* Resend OTP Link */}
        <p className="text-sm text-center mt-4">
          Didn't receive an OTP?{" "}
          <button
            onClick={() => alert("Resending OTP...")}
            className="text-blue-500 hover:underline"
          >
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
};

export default OtpVerification;
