import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Forms from "./Forms";

const DashboardContent = () => {
  const location = useLocation();
  console.log(location);
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
    <div className=" w-full  h-full flex">
      <div className=" w-[20%] border-r h- bg-white p-4">
        <Forms />
      </div>
      <div className=" w-[80%]  h-full bg-slate-100">
        <>
          <div className=" px-3 bg-white">
            <h2 className="text-lg font-bold py-3  ">Form Content</h2>
            <div className=" flex gap-2">
              <p
                onClick={() => {
                  setselectedOption("Intigration");
                  navigate("/dashboard/form/intigration");
                }}
                className={`${
                  selectedOption === "Intigration" && "border-b-2 text-black"
                } hover:border-b-2 pb-2 text-gray-500 cursor-pointer border-red-500 px-1`}
              >
                Intigration
              </p>
              <p
                onClick={() => {
                  setselectedOption("Submissions");
                  navigate("/dashboard/form/submissions");
                }}
                className={`${
                  selectedOption === "Submissions" && "border-b-2 text-black"
                } hover:border-b-2  pb-2 text-gray-500 cursor-pointer border-red-500 px-1`}
              >
                Submissions
              </p>
              <p
                onClick={() => {
                  setselectedOption("Setting");
                  navigate("/dashboard/form/setting");
                }}
                className={`${
                  selectedOption === "Setting" && "border-b-2 text-black"
                } hover:border-b-2 pb-2 text-gray-500 cursor-pointer border-red-500 px-1 `}
              >
                Settings
              </p>
            </div>
          </div>
          <div className="p-3">
            <Outlet />
          </div>
        </>
      </div>
    </div>
  );
};

export default DashboardContent;
