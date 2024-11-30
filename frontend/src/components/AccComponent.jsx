import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { EditOutlined } from "@ant-design/icons";
import { Modal, Progress } from "antd";
import { useForm } from "react-hook-form";
import { UpdateUserDetails } from "../Service/Api";
import toast from "react-hot-toast";
import { DeleteAccount } from "../Service/Api";
import { useNavigate } from "react-router-dom";
import SubmissionUsage from "./SubmissionUsage";

const AccComponent = () => {
  const navigate = useNavigate();
  const { user, fetchUserData } = useAppContext();
  const [editMode, setEditMode] = useState("Password");
  const [EditModal, setEditModal] = useState(false);
  function formatDateToCustomString(isoDate) {
    if (!isoDate) return "Invalid date"; // Handle empty or invalid input

    const date = new Date(isoDate);

    // Ensure the date is valid
    if (isNaN(date.getTime())) return "Invalid date";

    const options = {
      timeZone: "UTC",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formattedDate = date.toLocaleString("en-US", options);

    // Split and validate the output structure
    const parts = formattedDate?.split(", ");
    if (parts.length < 2) return "Invalid formatted date";

    const [monthDayYear, timeWithPeriod] = parts;
    const [time, period] = timeWithPeriod?.split(" ") || [];

    if (!time || !period || !monthDayYear) return "Formatting error";

    return `${time} ${period} UTC - ${monthDayYear}`;
  }

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const HandelForm = async (data) => {
    console.log("hi");
    console.log(data);
    try {
      const res = await UpdateUserDetails(data);
      const result = await res.json();
      if (result?.success) {
        toast.success(result?.message);
        fetchUserData();
        cancelForm();
      }
      if (result.error) {
        toast.error(result?.message);
      }
    } catch (error) {
      toast.error(error?.message || error);
    }
  };

  const cancelForm = () => {
    // reset({
    //   name: "",
    //   email: "",
    //   oldPassword: "",
    //   newPassword: "",
    // });
    setEditMode(null);
    setEditModal(false);
    reset();
  };

  const openModal = (mode) => {
    setEditMode(mode);
    reset();

    switch (mode) {
      case "Email":
        setValue("email", user?.email);
        break;
      case "Name":
        setValue("name", user?.name);
        break;
      case "Password":
        break;
      default:
        break;
    }
    setEditModal(true);
  };
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);

  const {
    register: deleteRegister,
    handleSubmit: handleDeleteSubmit,
    reset: resetDelete,
    formState: { errors: deleteErrors },
  } = useForm();
  const deleteAccount = async (data) => {
    try {
      const res = await DeleteAccount(data);
      const result = await res.json();
      if (result.success) {
        navigate("/login");
        // toast.success(result.message);
      }
      if (result.error) {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message || error);
    }
    console.log("deleteData", data);
  };

  return (
    <div>
      <Modal
        open={EditModal}
        closeIcon={false}
        title={
          <p className=" text-xl font-semibold">
            Update {editMode === "Email" && "Account Email"}{" "}
            {editMode === "Name" && "Username"}{" "}
            {editMode === "Password" && "Account Password"}
          </p>
        }
        footer={false}
      >
        <div>
          <form onSubmit={handleSubmit(HandelForm)}>
            {editMode === "Password" && (
              <>
                <div className=" mb-2">
                  <p className="text-lg font-semibold">Old Password</p>
                  <input
                    type="text"
                    {...register("oldPassword", {
                      required: "Please enter old password",
                    })}
                    className=" py-2 w-full px-2 border  outline-none rounded-md bg-slate-100"
                  />
                  {errors?.oldPassword && (
                    <p className=" m-0  text-red-500">
                      {errors.oldPassword.message}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-lg font-semibold">New Password</p>
                  <input
                    type="text"
                    {...register("newPassword", {
                      required: "Please enter new password",
                    })}
                    className=" w-full py-2 px-2 border outline-none rounded-md bg-slate-100"
                  />
                  {errors?.newPassword && (
                    <p className=" m-0  text-red-500">
                      {errors?.newPassword.message}
                    </p>
                  )}
                </div>
              </>
            )}
            {editMode === "Name" && (
              <>
                <input
                  type="text"
                  {...register("name", {
                    required: "Please enter user name",
                  })}
                  className=" bg-slate-100 outline-none px-2 border rounded-md py-2 w-full"
                />
                {errors?.name && (
                  <p className=" m-0  text-red-500">{errors.name.message}</p>
                )}
              </>
            )}
            {editMode === "Email" && (
              <>
                <input
                  type="text"
                  {...register("email", {
                    required: "Please enter your Email",
                  })}
                  className=" bg-slate-100 outline-none px-2 border rounded-md py-2 w-full"
                />
                {errors?.email && (
                  <p className=" m-0  text-red-500">{errors.email.message}</p>
                )}
              </>
            )}
            <div className=" flex justify-end mt-2 gap-2">
              <button
                type="button"
                onClick={cancelForm}
                className=" border px-3 py-2 font-semibold hover:bg-slate-100 rounded-md "
              >
                Cancel
              </button>
              <button
                type="submit"
                className=" border px-3 py-2  bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        title={<p className=" text-xl font-semibold">Delete Account</p>}
        open={deleteModalOpen}
        footer={false}
        onCancel={() => {
          setdeleteModalOpen(false);
          resetDelete();
        }}
      >
        <form onSubmit={handleDeleteSubmit(deleteAccount)}>
          <div className=" bg-red-300 w-full p-2 mb-2 rounded-md">
            <p className="text-white font-medium">
              Deleting your account will delete all forms and submissions.
            </p>
            <p className=" text-white font-medium ">
              This action cannot be undone.
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold mb-1">Enter your password</p>
            <input
              type="text"
              {...deleteRegister("deletePassword", {
                required: "Please enter your password",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              className=" bg-slate-100 outline-none px-2 border rounded-md py-2 w-full"
            />
            {deleteErrors?.deletePassword && (
              <p className=" m-0  text-red-500">
                {deleteErrors?.deletePassword.message}
              </p>
            )}
          </div>
          <div className=" flex justify-end mt-3">
            <button
              type="submit"
              className=" font-semibold text-white bg-red-500 rounded-md px-3 py-2"
            >
              Delete
            </button>
          </div>
        </form>
      </Modal>
      <div className=" bg-white shadow rounded-md mb-3">
        <p className="border-b uppercase py-3 px-3 text-sm font-medium">
          Account
        </p>
        <div className="p-3 flex flex-col gap-2">
          <div className="flex flex-col">
            <p className="text-lg font-semibold">User Name</p>
            <div className=" flex  gap-2 w-full">
              <p className="flex rounded-md items-center px-3 bg-slate-100 py-2 w-full">
                {user?.name}
              </p>
              <button
                className="h-11 border bg-blue-500 hover:bg-blue-600 rounded-md px-3"
                onClick={() => openModal("Name")}
              >
                <EditOutlined className=" text-white text-xl" />
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Register Email</p>
            <div className=" flex  gap-2 w-full">
              <p className="flex rounded-md items-center px-3 bg-slate-100 py-2 w-full">
                {user?.email}
              </p>
              <button
                className="h-11 border bg-blue-500 hover:bg-blue-600 rounded-md px-3"
                onClick={() => openModal("Email")}
              >
                <EditOutlined className=" text-white text-xl" />
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Password</p>
            <div className=" flex  gap-2 w-full">
              <p className="flex rounded-md items-center px-3 font-bold tracking-widest bg-slate-100 py-2 w-full">
                **********
              </p>
              <button
                className="h-11 border bg-blue-500 hover:bg-blue-600 rounded-md px-3"
                onClick={() => openModal("Password")}
              >
                <EditOutlined className=" text-white text-xl" />
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-semibold m-0">Registered on</p>
            <div className=" flex  gap-2 mb-2 w-full">
              <p className="flex rounded-md items-center   m-0  w-full">
                {formatDateToCustomString(user?.createdAt)}
              </p>
              <button
                onClick={() => setdeleteModalOpen(true)}
                className=" w-[200px] text-right  text-red-500 font-semibold"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
      <SubmissionUsage
        submissionlimit={user?.submissionlimit}
        submissionsuse={user?.submissionsuse}
      />
    </div>
  );
};

export default AccComponent;
