import React, { useEffect, useState } from "react";
import { Modal, Switch } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { DeleteForm } from "../Service/Api";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { selectedForm, setSelectedForm } = useAppContext();
  const navigate = useNavigate();
  // Set up React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Set form default values from the selectedForm
  useEffect(() => {
    if (selectedForm) {
      setValue("formName", selectedForm.formName || "");
      setValue("formEnable", selectedForm.formEnable || false);
      setValue("emailNotifications", selectedForm.emailNotifications || false);
      setValue("email", selectedForm.email || "");
    }
  }, [selectedForm, setValue]);

  // Handle form submission
  const onSubmit = async (data) => {
    // API call to save form data (use your API method)
    try {
      console.log("Saving form data", data);
      setSelectedForm({ ...data });
      alert("Form data saved!");
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };

  // Handle email notifications toggle
  const onEmailNotificationChange = async (checked) => {
    // API call to save email notification settings
    try {
      // Save email notification setting
      console.log("Email Notifications setting:", checked);
      // Example API call to save the email notification setting
      // await saveEmailNotifications(checked);

      setSelectedForm((prev) => ({
        ...prev,
        emailNotifications: checked,
      }));

      alert("Email notifications setting saved!");
    } catch (error) {
      console.error("Error saving email notifications:", error);
    }
  };

  const DeleteFormFunction = async () => {
    try {
      const res = await DeleteForm({ formId: selectedForm?.formId });
      const result = await res?.json();
      if (result.success) {
        console.log(result);
        navigate("/dashboard");
        setSelectedForm(null);
      }
    } catch (error) {
      toast.error(error?.message || "Internal Server Error");
    }
  };
  const [DeleteConfim, setDeleteConfim] = useState(false);
  return (
    <>
      <div className="mb-3 shadow bg-white rounded-md">
        <p className="border-b uppercase py-3 px-3 text-sm font-medium">
          General
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="p-3">
          {/* Form Name */}
          <div className="mb-3">
            <p className="text-lg font-semibold">Form Name</p>
            <div className="flex gap-2">
              <input
                type="text"
                className="border bg-slate-100 p-2 rounded-md w-full"
                {...register("formName", { required: true })}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white font-medium px-4 p-2 rounded-md"
              >
                Save
              </button>
            </div>
            {errors.formName && (
              <p className="text-red-500">Form Name is required.</p>
            )}
            <p className="text-gray-500">
              The form name won't be shown to your visitors.
            </p>
          </div>

          {/* Form Enable */}
          <div className="mb-3 flex justify-between items-start">
            <div>
              <p className="text-lg font-semibold">Form Enable</p>
              <p className="text-gray-500">Enable or disable the form.</p>
            </div>
            <Switch
              checked={selectedForm.formEnable}
              onChange={(checked) => {
                setValue("formEnable", checked);
                setSelectedForm((prev) => ({ ...prev, formEnable: checked }));
              }}
            />
          </div>

          {/* Email Notifications */}
          <div className="mb-3 flex justify-between items-start">
            <div>
              <p className="text-lg font-semibold">Email Notifications</p>
              <p className="text-gray-500">
                Enable or disable sending notification emails.
              </p>
            </div>
            <Switch
              checked={selectedForm.emailNotifications}
              onChange={onEmailNotificationChange}
            />
          </div>

          {/* Target Email */}
          <div className="mb-3">
            <p className="text-lg font-semibold">Target Email</p>
            <div className="flex gap-2">
              <input
                type="email"
                className="border bg-slate-100 p-2 rounded-md w-full"
                {...register("email", { required: true })}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white font-medium px-4 p-2 rounded-md"
              >
                Save
              </button>
            </div>
            {errors.email && <p className="text-red-500">Email is required.</p>}
            <p className="text-gray-500">
              Where to send submission notifications.
            </p>
          </div>
        </form>
      </div>
      <Modal
        open={DeleteConfim}
        closeIcon={false}
        // onCancel={() => setDeleteConfim(false)}
        footer={false}
        width={300}
      >
        <div className="mb-[-10px]">
          <p className=" mb-2 text-center text-[1rem] font-medium">
            Are you sure you want to delete "{selectedForm?.formName}" form ?
          </p>
          <div className=" flex  gap-2 w-full justify-center">
            <button
              onClick={() => setDeleteConfim(false)}
              className="border hover:bg-gray-100 w-full rounded-md px-3 py-1"
            >
              Cancel
            </button>
            <button
              onClick={() => DeleteFormFunction()}
              className="border w-full hover:bg-red-600 bg-red-500 text-white rounded-md px-3 py-1"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
      <div className="shadow bg-white rounded-md">
        <p className="border-b uppercase py-3 px-3 text-sm font-medium">
          Danger Zone
        </p>
        <div className="p-3">
          <div className="mb-3 flex justify-between items-start">
            <div>
              <p className="text-lg font-semibold">Delete Form</p>
              <p className="text-gray-500">
                Deleting the form will also delete all submissions.
              </p>
            </div>
            <DeleteOutlined
              onClick={() => setDeleteConfim(true)}
              className="text-red-500 text-xl cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
