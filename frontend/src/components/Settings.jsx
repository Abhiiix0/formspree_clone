import React, { useEffect, useState } from "react";
import { Modal, Switch } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { DeleteForm, updateForm } from "../Service/Api";
import { useNavigate, useParams } from "react-router-dom";

const Settings = () => {
  const { selectedForm, setSelectedForm, fetchSIngleForm } = useAppContext();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id from the URL
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  // Set form default values from the selectedForm
  useEffect(() => {
    if (selectedForm) {
      setValue("formName", selectedForm.formName || "");
      setValue("email", selectedForm.email || "");
    }
  }, [selectedForm, setValue]);

  // Handle saving the form name
  const saveFormName = async () => {
    const formName = getValues("formName");
    try {
      const payload = { formId: selectedForm?.formId, formName };
      const res = await updateForm(payload);
      const result = await res.json();
      if (result?.success) {
        setSelectedForm((prev) => ({ ...prev, formName }));
        toast.success("Form name saved!");
      } else {
        toast.error(res?.message || "Failed to save form name.");
      }
    } catch (error) {
      toast.error(error?.message || "Internal Server Error");
    }
  };

  // Handle saving the target email
  const saveTargetEmail = async () => {
    const email = getValues("email");
    try {
      const payload = { formId: selectedForm?.formId, email };
      const res = await updateForm(payload);
      const result = await res.json();
      if (result?.success) {
        setSelectedForm((prev) => ({ ...prev, email }));
        toast.success("Target email saved!");
      } else {
        toast.error(res?.message || "Failed to save email.");
      }
    } catch (error) {
      toast.error(error?.message || "Internal Server Error");
    }
  };

  // Handle form enable toggle
  const toggleFormEnable = async (checked) => {
    try {
      const payload = { formId: selectedForm?.formId, active: checked };
      const res = await updateForm(payload);
      const result = await res.json();
      if (result?.success) {
        setSelectedForm((prev) => ({ ...prev, active: checked }));
        toast.success(`Form ${checked ? "enabled" : "disabled"}!`);
      } else {
        toast.error(res?.message || "Failed to update form enable status.");
      }
    } catch (error) {
      toast.error(error?.message || "Internal Server Error");
    }
  };

  // Handle email notifications toggle
  const toggleEmailNotification = async (checked) => {
    try {
      const payload = { formId: selectedForm?.formId, notification: checked };
      const res = await updateForm(payload);
      const result = await res.json();
      if (result?.success) {
        setSelectedForm((prev) => ({ ...prev, notification: checked }));
        toast.success(
          `Email notifications ${checked ? "enabled" : "disabled"}!`
        );
      } else {
        toast.error(
          res?.message || "Failed to update email notification status."
        );
      }
    } catch (error) {
      toast.error(error?.message || "Internal Server Error");
    }
  };

  // Handle form deletion
  const DeleteFormFunction = async () => {
    try {
      const res = await DeleteForm({ formId: selectedForm?.formId });

      const result = await res.json();
      if (result?.success) {
        navigate("/dashboard");
        setSelectedForm(null);
        toast.success("Form deleted successfully!");
      } else {
        toast.error(result?.message || "Failed to delete form.");
      }
    } catch (error) {
      toast.error(error?.message || "Internal Server Error");
    }
  };

  const [DeleteConfim, setDeleteConfim] = useState(false);
  useEffect(() => {
    fetchSIngleForm(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <>
      {/* General Section */}
      <div className="mb-3 shadow bg-white rounded-md">
        <p className="border-b uppercase py-3 px-3 text-sm font-medium">
          General
        </p>
        <form className="p-3">
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
                type="button"
                className="bg-blue-500 text-white font-medium px-4 p-2 rounded-md"
                onClick={saveFormName}
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
              checked={selectedForm?.active}
              onChange={toggleFormEnable}
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
              checked={selectedForm?.notification}
              onChange={toggleEmailNotification}
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
                type="button"
                className="bg-blue-500 text-white font-medium px-4 p-2 rounded-md"
                onClick={saveTargetEmail}
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

      {/* Danger Zone */}
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

      {/* Delete Confirmation Modal */}
      <Modal open={DeleteConfim} closeIcon={false} footer={false} width={300}>
        <div>
          <p className="mb-2 text-center text-[1rem] font-medium">
            Are you sure you want to delete "{selectedForm?.formName}" form?
          </p>
          <div className="flex gap-2 w-full justify-center">
            <button
              onClick={() => setDeleteConfim(false)}
              className="border hover:bg-gray-100 w-full rounded-md px-3 py-1"
            >
              Cancel
            </button>
            <button
              onClick={DeleteFormFunction}
              className="border w-full hover:bg-red-600 bg-red-500 text-white rounded-md px-3 py-1"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Settings;
