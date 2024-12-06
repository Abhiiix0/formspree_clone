import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import eazyformlogo from "../assets/eazyform.png";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const Register = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAppContext();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/registration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        // alert("Registration successful");
        toast.success("Verification OTP sent to your email");
        // console.log(result);
        navigate("/signup/OtpVerification");
        setUser({
          name: name,
          email: email,
        });
        reset();
      } else {
        toast.error(result?.message || "Something went wrong");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  return (
    <div className="flex justify-center relative items-center min-h-screen gradient bg-gray-100 p-4">
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center uppercase tracking-wider  text-white">
          Register
        </h2>

        {/* Name Field */}
        <div className="mb-2">
          <label className="block  font-semibold text-white">Name</label>
          <div className="relative">
            <UserOutlined className="absolute top-3 left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Enter your name"
              className={`w-full pl-10 p-2 border-2 rounded-md outline-none  ${
                errors.name ? "border-red-500" : ""
              }`}
              {...register("name", { required: "Name is required" })}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-[10px]">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-2">
          <label className="block text-white font-semibold">Email</label>
          <div className="relative">
            <MailOutlined className="absolute top-3 left-3 text-gray-500" />
            <input
              type="email"
              placeholder="Enter your email"
              className={`w-full pl-10 p-2 border-2 rounded-md outline-none  ${
                errors.email ? "border-red-500" : ""
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
            <p className="text-red-500 text-[10px]">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-2">
          <label className="block text-white font-semibold">Password</label>
          <div className="relative">
            <LockOutlined className="absolute top-3 left-3 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={`w-full pl-9 py-2 pr-9 border-2 rounded-md outline-none ${
                errors.password ? "border-red-500" : ""
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
            <p className="text-red-500 text-[10px]">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4">
          <label className="block text-white font-semibold">
            Confirm Password
          </label>
          <div className="relative">
            <LockOutlined className="absolute top-3 left-3 text-gray-500" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className={`w-full pl-9 py-2 pr-9 border-2 rounded-md outline-none ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            <button
              type="button"
              className="absolute top-2 right-3 text-gray-500"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-[10px]">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Register
        </button>

        {/* Login Link */}
        <p className="mt-4 text-white text-center text-sm">
          Already have an account ?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
