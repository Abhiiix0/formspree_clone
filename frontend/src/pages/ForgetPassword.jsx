// src/components/Login.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import eazyformlogo from "../assets/eazyform.png";
import {
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import encryptMessage from "../Helper/Encryption";
import { Helmet } from "react-helmet";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [errorMessage, setErrorMessage] = useState("");
  const [formSteps, setformSteps] = useState(2);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const { email } = data;
    const payload = {
      email,
    };
    const encPayload = { encData: encryptMessage(payload) };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/forgetpassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(encPayload),
          credentials: "include",
        }
      );
      console.log(response);
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        toast.success("Otp sent successfully");
        setformSteps(2);
      } else {
        toast.error(result?.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };
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
  return (
    <div className="flex relative justify-center items-center min-h-screen gradient  bg-gray-100 p-4">
      <Helmet>
        <title>Forget Password - EazyForm</title>

        <meta
          name="description"
          content="Login to your EazyForm account to manage forms and submissions effortlessly."
        />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta
          name="keywords"
          content="EazyForm, Login, Form Management, User Authentication"
        />
        <meta property="og:title" content="Login - EazyForm" />
        <meta
          property="og:description"
          content="Login to your EazyForm account to manage forms and submissions effortlessly."
        />
      </Helmet>
      <Link
        to="/"
        className=" w-full  absolute top-3 sm:top-4 cursor-pointer font-bold text-lg md:text-2xl text-white"
      >
        <img
          src={eazyformlogo}
          className=" h-7 md:h-10 px-4 sm:px-12 bg-transparent rounded-sm object-contain"
          alt="EazyForm Logo"
        />
      </Link>

      {formSteps === 1 && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-center tracking-wider uppercase text-white">
            Forget Passowrd
          </h2>

          {/* Email Field */}
          <div className="mb-2">
            <label className="block mb-0 font-semibold text-white">Email</label>
            <div className="relative">
              <MailOutlined className="absolute top-3 left-3 text-gray-500" />
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full pl-10 p-2 border-2 rounded-md outline-none  ${
                  errors.email ? "border-red-500" : "focus:ring-blue-500"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Send OTP
          </button>

          {/* Registration Link */}
          <div className="text-center mt-4">
            <p className="text-sm text-white">
              Don't have an account ?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </form>
      )}
      {formSteps === 2 && (
        <div className="w-full max-w-sm bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl text-white font-bold mb-4 text-center uppercase">
            Verify OTP
          </h2>

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
          <p className="text-sm text-center text-white mt-4">
            Didn't receive an OTP?{" "}
            <button
              onClick={() => alert("Resending OTP...")}
              className="text-blue-500  hover:underline"
            >
              Resend OTP
            </button>
          </p>
        </div>
      )}
      {formSteps === 3 && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-center tracking-wider uppercase text-white">
            Reset Password
          </h2>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block mb-0 font-semibold text-white">
              Old Password
            </label>
            <div className="relative">
              <LockOutlined className="absolute top-3 left-3 text-gray-500" />
              <input
                // type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`w-full pl-10 p-2 border-2 outline-none rounded-md ${
                  errors.password ? "border-red-500" : "focus:ring-blue-500"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                className="absolute top-2 right-3 text-gray-500"
                // onClick={togglePasswordVisibility}
              >
                {true ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block mb-0 font-semibold text-white">
              New Password
            </label>
            <div className="relative">
              <LockOutlined className="absolute top-3 left-3 text-gray-500" />
              <input
                // type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`w-full pl-10 p-2 border-2 outline-none rounded-md ${
                  errors.password ? "border-red-500" : "focus:ring-blue-500"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                className="absolute top-2 right-3 text-gray-500"
                // onClick={togglePasswordVisibility}
              >
                {true ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgetPassword;
