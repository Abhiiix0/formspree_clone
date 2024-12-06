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
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(encPayload),
          credentials: "include",
        }
      );
      const result = await response.json();
      // console.log(result);
      if (response.ok) {
        toast.success("Login successful!");

        localStorage.setItem("token", result.token);
        navigate("/dashboard");
      } else {
        toast.error(
          result?.message || "Invalid credentials. Please try again."
        );
        // alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="flex relative justify-center items-center min-h-screen gradient  bg-gray-100 p-4">
      <Link
        to="/"
        className=" w-full  absolute top-3 cursor-pointer font-bold text-lg md:text-2xl text-white"
      >
        <img
          src={eazyformlogo}
          className=" h-7 md:h-10 px-3 bg-transparent rounded-sm object-contain"
          alt="EazyForm Logo"
        />
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center tracking-wider uppercase text-white">
          Login
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

        {/* Password Field */}
        <div className="mb-4">
          <label className="block mb-0 font-semibold text-white">
            Password
          </label>
          <div className="relative">
            <LockOutlined className="absolute top-3 left-3 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
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
          <p className="text-sm text-white">
            Don't have an account ?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
