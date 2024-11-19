// src/components/Login.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppContext } from "../context/AppContext";
import {
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import encryptMessage from "../Helper/Encryption";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const { email, password } = data;
    const payload = {
      email,
      password,
    };
    const encPayload = { encData: encryptMessage(payload) };
    // Dummy API call simulation
    try {
      // Replace with your API call
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(encPayload),
        credentials: "include",
      });
      const result = await response.json();
      // console.log(result);
      if (response.ok) {
        // login(result.user); // Update context with user data
        toast.success("Login successful!");
        console.log(result);
        localStorage.setItem("token", result.token);
        navigate("/dashboard");
      } else {
        toast.error(
          result?.message || "Invalid credentials. Please try again."
        );
        // alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Email Field */}
        <div className="mb-2">
          <label className="block mb-1 font-semibold">Email</label>
          <div className="relative">
            <MailOutlined className="absolute top-3 left-3 text-gray-500" />
            <input
              type="email"
              placeholder="Enter your email"
              className={`w-full pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 ${
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

        {/* Password Field */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Password</label>
          <div className="relative">
            <LockOutlined className="absolute top-3 left-3 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={`w-full pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 ${
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
              className="absolute top-3 right-3 text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
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
          Login
        </button>

        {/* Registration Link */}
        <div className="text-center mt-4">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
