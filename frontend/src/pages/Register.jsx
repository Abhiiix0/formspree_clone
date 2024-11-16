import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function onSubmit(data) {
    console.log(data);
    const datas = await fetch("/reister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert("Registration Successful!");
  }

  // Watch password for confirm password validation
  const password = watch("password");

  // Toggle visibility of password
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Left: Registration Form */}

      <div className="w-full md:w-1/2 border-t border-b border-l lg:w-1/3 p-6 bg-white min-h-[435px] rounded-l-lg ">
        <h2 className="text-3xl font-bold text-center mb-6">
          Create an Account
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col justify-between  min-h-[320px]"
        >
          {/* Full Name */}
          <div className="relative">
            <UserOutlined className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              {...register("fullName", { required: "Full Name is required" })}
              className={`w-full pl-10 px-3 py-2 border rounded-md ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Full Name"
            />
            {errors.fullName && (
              <p className="m-0 text-sm text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <MailOutlined className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full pl-10 px-3 py-2 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Email Address"
            />
            {errors.email && (
              <p className="m-0 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <LockOutlined className="absolute top-3 left-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`w-full pl-10 px-3 py-2 border rounded-md ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Password"
            />
            <span
              className="absolute top-3 right-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {!showPassword ? (
                <EyeInvisibleOutlined className="text-gray-400" />
              ) : (
                <EyeOutlined className="text-gray-400" />
              )}
            </span>
            {errors.password && (
              <p className="m-0 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <LockOutlined className="absolute top-3 left-3 text-gray-400" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className={`w-full pl-10 px-3 py-2 border rounded-md ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Confirm Password"
            />
            <span
              className="absolute top-3 right-3 cursor-pointer"
              onClick={toggleConfirmPasswordVisibility}
            >
              {!showConfirmPassword ? (
                <EyeInvisibleOutlined className="text-gray-400" />
              ) : (
                <EyeOutlined className="text-gray-400" />
              )}
            </span>
            {errors.confirmPassword && (
              <p className="m-0 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </div>

      {/* Right: Background Image with Overlay and Advantages */}
      <div className="w-full hidden md:block md:w-1/2 lg:w-1/3 relative h-full min-h-[435px] rounded-r-lg overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative p-8 text-white flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-green-400 text-xl mr-3">✔️</span>
              <p className="text-white">
                <strong>Effortless Form Management</strong> - Easily create and
                manage forms without any backend setup.
              </p>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 text-xl mr-3">✔️</span>
              <p className="text-white">
                <strong>Real-Time Notifications</strong> - Get notified
                instantly when someone submits a form on your website.
              </p>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 text-xl mr-3">✔️</span>
              <p className="text-white">
                <strong>Seamless Integrations</strong> - Connect your forms with
                popular tools like Zapier and Slack.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Register;
