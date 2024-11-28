import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { EditOutlined } from "@ant-design/icons";
import { Modal, Progress } from "antd";
import { useForm } from "react-hook-form";

const AccComponent = () => {
  const { user, setUser } = useAppContext();
  const [editMode, setEditMode] = useState();
  const [EditModal, setEditModal] = useState(false);
  function formatDateToCustomString(isoDate) {
    const date = new Date(isoDate);

    const options = {
      timeZone: "UTC",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    // Format the date using toLocaleString
    const formattedDate = date.toLocaleString("en-US", options);

    // Extracting and reformatting the output
    const [monthDayYear, timeWithPeriod] = formattedDate?.split(", ");
    const [time, period] = timeWithPeriod?.split(" ");

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
    try {
      console.log(data);
    } catch (error) {}
  };

  const cancelForm = () => {
    reset();
    setEditMode("");
    setEditModal(false);
  };

  const openModal = (mode) => {
    setEditMode(mode);
    switch (mode) {
      case "Email":
        setValue("email", user?.email);
        setEditModal(true);
        break;
      case "Name":
        setValue("name", user?.name);
        setEditModal(true);
        break;
      case "Password":
        // setValue("password", user?.password);
        setEditModal(true);
        break;
      default:
        break;
    }
  };
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);
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
            {editMode === "Password" && (
              <div className=" flex flex-col gap-2">
                <div>
                  <p className="text-lg font-semibold">Old Password</p>
                  <input
                    {...register("oldPassword", {
                      required: "Please enter old password",
                    })}
                    className=" py-2 w-full px-2 border  outline-none rounded-md bg-slate-100"
                    type="text"
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
                    className=" w-full py-2 px-2 border outline-none rounded-md bg-slate-100"
                    type="text"
                    {...register("newPassword", {
                      required: "Please enter new password",
                    })}
                  />
                  {errors?.newPassword && (
                    <p className=" m-0  text-red-500">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>
              </div>
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
        onCancel={() => setdeleteModalOpen(false)}
      >
        <form onSubmit={handleSubmit(HandelForm)}>
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
              {...register("name", {
                required: "Please enter user name",
              })}
              className=" bg-slate-100 outline-none px-2 border rounded-md py-2 w-full"
            />
            {errors?.name && (
              <p className=" m-0  text-red-500">{errors.name.message}</p>
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
      <div className=" bg-white rounded-md border">
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
      <div className=" bg-white rounded-md mt-3 border">
        <p className="border-b uppercase py-3 px-3 text-sm font-medium">
          Usage
        </p>
        <div className="p-3 flex flex-col gap-2">
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Monthly Submissions</p>
            <div className=" flex flex-col gap-1 w-full">
              <p className=" font-semibold text-xl text-gray-500">0 / 50</p>
              <Progress
                percent={30}
                size={{ height: "14px" }}
                showInfo={false}
                si
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccComponent;
