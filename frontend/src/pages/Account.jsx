import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Button, Input } from "antd";
import DashbaordHeader from "../components/DashbaordHeader";
import Footer from "../components/Footer";
import BillingComp from "../components/BillingComp";

const Account = () => {
  const [activeTab, setActiveTab] = useState("account"); // Track the selected tab (Account/Billing)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // Modal visibility
  const [editField, setEditField] = useState(""); // Field to edit (Name, Email, etc.)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Delete account modal visibility

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Account Data Submitted:", data);
    // API call to update user data
  };

  const handleEdit = (field) => {
    setEditField(field);
    setIsEditModalVisible(true); // Open modal for editing
  };

  const handleSaveEdit = (data) => {
    // Save the changes
    console.log("Field Data Edited:", data);
    setIsEditModalVisible(false); // Close modal
  };

  const handleDeleteAccount = (data) => {
    // Delete account logic (confirmation)
    console.log("Account Deleted with password:", data);
    setIsDeleteModalVisible(false); // Close delete modal
  };

  return (
    <div className=" bg-gray-100">
      <DashbaordHeader />
      <div className=" h-screen  flex md:flex-row flex-col w-full">
        {/* Left Sidebar */}
        <div className=" w-full md:w-[20%] bg-white p-4 border-r">
          <h2 className="text-xl hidden md:block font-semibold mb-6">
            Settings
          </h2>
          <div className=" flex flex-row md:flex-col">
            <button
              className={`w-full py-2 px-4 md:mb-2  rounded-l-md md: rounded-none text-center md:text-left ${
                activeTab === "account"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveTab("account")}
            >
              Account
            </button>
            <button
              className={`w-full py-2 text-center px-4 rounded-r-md md: rounded-none md:text-left ${
                activeTab === "billing"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveTab("billing")}
            >
              Billing
            </button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className=" md:w-[80%] m-3">
          {activeTab === "account" ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6">
                Account Information
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <div className="flex justify-between items-center">
                    <span className="text-lg">John Doe</span>
                    <Button
                      onClick={() => handleEdit("name")}
                      className="bg-blue-500 text-white"
                    >
                      Edit
                    </Button>
                  </div>
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="flex justify-between items-center">
                    <span className="text-lg">john.doe@example.com</span>
                    <Button
                      onClick={() => handleEdit("email")}
                      className="bg-blue-500 text-white"
                    >
                      Edit
                    </Button>
                  </div>
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="flex justify-between items-center">
                    <span className="text-lg">••••••••</span>
                    <Button
                      onClick={() => handleEdit("password")}
                      className="bg-blue-500 text-white"
                    >
                      Edit
                    </Button>
                  </div>
                </div>

                {/* Registered Date */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Registered
                  </label>
                  <div className="flex justify-between items-center">
                    <span className="text-lg">January 1, 2020</span>
                    <Button
                      onClick={() => handleEdit("registered")}
                      className="bg-blue-500 text-white"
                    >
                      Edit
                    </Button>
                  </div>
                </div>

                {/* Delete Account */}
                <div className="mt-6">
                  <Button
                    onClick={() => setIsDeleteModalVisible(true)}
                    className="bg-red-500 text-white w-full"
                  >
                    Delete Account
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <BillingComp />
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        title={`Edit ${editField.charAt(0).toUpperCase() + editField.slice(1)}`}
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <form onSubmit={handleSubmit(handleSaveEdit)}>
          {editField === "name" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
          )}
          {editField === "email" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          )}
          {editField === "password" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <Input.Password
                {...register("password", { required: "Password is required" })}
                placeholder="Enter new password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          )}
          {editField === "registered" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Registered
              </label>
              <span className="text-lg">January 1, 2020</span>
            </div>
          )}
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-500 text-white"
          >
            Save
          </Button>
        </form>
      </Modal>

      {/* Delete Account Modal */}
      <Modal
        title="Delete Account"
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        footer={null}
      >
        <form onSubmit={handleSubmit(handleDeleteAccount)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Enter your password to confirm:
            </label>
            <Input.Password
              {...register("password", { required: "Password is required" })}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <Button type="danger" htmlType="submit" className="w-full">
            Confirm Deletion
          </Button>
        </form>
      </Modal>
      <Footer />
    </div>
  );
};

export default Account;
