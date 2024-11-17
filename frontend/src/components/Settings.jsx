import React from "react";
import { Switch } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
const Settings = () => {
  return (
    <>
      <div className="mb-3 shadow bg-white rounded-md ">
        <p className=" border-b uppercase py-3 px-3 text-sm font-medium">
          General
        </p>
        <div className="p-3">
          <div className=" mb-3">
            <p className=" text-lg font-semibold">Form Name</p>
            <div className=" flex gap-2">
              <input
                type="text"
                className=" border bg-slate-100 p-2 rounded-md w-full"
              />
              <button className=" bg-blue-500 text-white font-medium px-4 p-2 rounded-md">
                Save
              </button>
            </div>
            <p className=" text-gray-500">
              The form name won't be shown to your visitors.
            </p>
          </div>
          <div className=" mb-3 flex justify-between items-start">
            <div>
              <p className=" text-lg font-semibold">Form Enable</p>
              <p className=" text-gray-500">
                The form name won't be shown to your visitors.
              </p>
            </div>
            <Switch />
          </div>
          <div className=" mb-3 flex justify-between items-start">
            <div>
              <p className=" text-lg font-semibold">Email Notifications</p>
              <p className=" text-gray-500">
                Enable or disable sending notification emails.
              </p>
            </div>
            <Switch />
          </div>
          <div className=" mb-3">
            <p className=" text-lg font-semibold">Target Email</p>
            <div className=" flex gap-2">
              <input
                type="text"
                className=" border bg-slate-100 p-2 rounded-md w-full"
              />
              <button className=" bg-blue-500 text-white font-medium px-4 p-2 rounded-md">
                Save
              </button>
            </div>
            <p className=" text-gray-500">
              Where to send submissions notifications.
            </p>
          </div>
        </div>
      </div>
      <div className=" shadow bg-white rounded-md ">
        <p className=" border-b uppercase py-3 px-3 text-sm font-medium">
          Danger zone
        </p>
        <div className="p-3">
          <div className=" mb-3 flex justify-between items-start">
            <div>
              <p className=" text-lg font-semibold">Delete Form</p>
              <p className=" text-gray-500">
                Deleting the form will also delete all submissions.
              </p>
            </div>
            <DeleteOutlined className=" text-red-500 text-xl cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
