import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const DashboardContent = () => {
  const navigate = useNavigate();
  const forms = [
    {
      id: 1,
      name: "Form 1",
    },
    {
      id: 2,
      name: "Form 2",
    },
    {
      id: 3,
      name: "Form 2",
    },
  ];
  const [selectedForm, setselectedForm] = useState();
  const [selectedOption, setselectedOption] = useState();
  return (
    <div className=" w-full h-[90vh] flex">
      <div className=" w-[20%] border-r h-full bg-white p-4">
        <button className=" h-12 hover:bg-slate-100 w-full rounded-md border">
          <PlusOutlined className=" mr-2" />
          Add New
        </button>
        <div className=" mt-4">
          <h2 className="text-lg font-bold my-1 ">Forms</h2>
          <div className=" flex flex-col gap-2">
            {forms.map((form) => (
              <p
                key={form.id}
                onClick={() => {
                  setselectedForm(form.id);
                }}
                className={` ${
                  selectedForm === form.id && "bg-slate-100"
                } font-medium cursor-pointer p-1 m-0 border hover:bg-slate-100 rounded-md`}
              >
                {form?.name}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className=" w-[80%]  h-full bg-slate-100">
        <div className=" px-3 bg-white">
          <h2 className="text-lg font-bold py-3  ">Form Content</h2>
          <div className=" flex gap-2">
            <p
              onClick={() => {
                setselectedOption("Intigration");
                navigate("/dashboard/intigration");
              }}
              className={`${
                selectedOption === "Intigration" && "border-b-2 text-black"
              } hover:border-b-2 pb-2 text-gray-500 cursor-pointer border-red-500 px-1`}
            >
              Intigration
            </p>
            <p
              onClick={() => setselectedOption("Submissions")}
              className={`${
                selectedOption === "Submissions" && "border-b-2 text-black"
              } hover:border-b-2  pb-2 text-gray-500 cursor-pointer border-red-500 px-1`}
            >
              Submissions
            </p>
            <p
              onClick={() => {
                setselectedOption("Setting");
                navigate("/dashboard/setting");
              }}
              className={`${
                selectedOption === "Setting" && "border-b-2 text-black"
              } hover:border-b-2 pb-2 text-gray-500 cursor-pointer border-red-500 px-1 `}
            >
              Settings
            </p>
          </div>
        </div>
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
