import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Forms from "./Forms";
import FromNotSelect from "./FromNotSelect.jsx";
import { useAppContext } from "../context/AppContext.js";
import { useEffect } from "react";
import Intigration from "./Intigration.jsx";
import Settings from "./Settings.jsx";
import Submissions from "./Submissions.jsx";
const DashboardContent = () => {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();

  const { selectedForm, setSelectedForm } = useAppContext();

  const [selectedOption, setselectedOption] = useState(
    location.pathname.split("/")[location.pathname.split("/").length - 1]
  );
  useEffect(() => {
    if (location?.pathname !== "/dashboard") {
      setselectedOption("intigration");
    }
  }, [selectedForm]);

  return (
    <div className=" w-full  h-full flex">
      <div
        className={`  ${
          location.pathname === "/dashboard"
            ? "w-[100%] md:w-[20%]"
            : " hidden md:block"
        } border-r md:w-[20%] h-[80vh] bg-white p-4`}
      >
        <Forms />
      </div>
      <div
        className={`  ${
          selectedOption === "intigration" ||
          selectedOption === "submissions" ||
          selectedOption === "setting"
            ? "w-[100%]"
            : "hidden md:block md:w-[80%]"
        } h-full bg-slate-100`}
      >
        {location.pathname === "/dashboard" ? (
          <div className=" hidden md:block">
            <FromNotSelect></FromNotSelect>
          </div>
        ) : (
          <>
            <div className=" px-3 bg-white">
              <div className=" flex gap-2 items-center">
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setselectedOption("dashboard");
                    setSelectedForm("");
                  }}
                  className=" rounded-md md:hidden border h-8 px-2"
                >
                  <LeftOutlined />
                </button>
                <h2 className="text-lg font-bold py-3  ">
                  {selectedForm?.formName}
                </h2>
              </div>
              <div className=" flex gap-2">
                <p
                  onClick={() => {
                    setselectedOption("intigration");
                  }}
                  className={`${
                    selectedOption === "intigration" && "border-b-2 text-black"
                  } hover:border-b-2 pb-2 text-gray-500 cursor-pointer border-red-500 px-1`}
                >
                  Intigration
                </p>
                <p
                  onClick={() => {
                    setselectedOption("submissions");
                  }}
                  className={`${
                    selectedOption === "submissions" && "border-b-2 text-black"
                  } hover:border-b-2  pb-2 text-gray-500 cursor-pointer border-red-500 px-1`}
                >
                  Submissions
                </p>
                <p
                  onClick={() => {
                    setselectedOption("setting");
                  }}
                  className={`${
                    selectedOption === "setting" && "border-b-2 text-black"
                  } hover:border-b-2 pb-2 text-gray-500 cursor-pointer border-red-500 px-1 `}
                >
                  Settings
                </p>
              </div>
            </div>
            <div className="p-3">
              {selectedOption === "intigration" && <Intigration />}
              {selectedOption === "submissions" && <Submissions />}
              {selectedOption === "setting" && <Settings />}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
