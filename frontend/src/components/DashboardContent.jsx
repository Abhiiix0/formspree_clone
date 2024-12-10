import { LeftOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Forms from "./Forms";
import FromNotSelect from "./FromNotSelect.jsx";
import { useAppContext } from "../context/AppContext.js";
import { useEffect } from "react";
import Intigration from "./Intigration.jsx";
import Settings from "./Settings.jsx";
import Submissions from "./Submissions.jsx";
import { useParams } from "react-router-dom";
const DashboardContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id from the URL
  const { selectedForm, setSelectedForm } = useAppContext();
  const [selectedOption, setselectedOption] = useState(
    location.pathname.split("/")[location.pathname.split("/").length - 1]
  );

  useEffect(() => {
    setselectedOption("intigration");
  }, [id]);

  return (
    <div className=" w-full  h-full flex">
      <div
        className={`  ${
          location.pathname === "/dashboard" ? "w-[100%]" : " hidden lg:block"
        } border-r lg:w-[20%] bg-white lg:p-4`}
      >
        <Forms />
      </div>

      <div
        className={`${
          selectedOption &&
          (selectedForm ? "w-full" : "hidden md:block lg:w-[100%]")
        } h-full bg-slate-100`}
      >
        {location.pathname === "/dashboard" ? (
          <div className=" hidden lg:block">
            <FromNotSelect></FromNotSelect>
          </div>
        ) : (
          <>
            <div className=" px-3 w-full bg-white">
              <div className=" flex gap-2 items-center">
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setselectedOption("dashboard");
                    setSelectedForm("");
                  }}
                  className=" rounded-md lg:hidden border h-8 px-2"
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
                    selectedOption === "intigration"
                      ? " text-black border-b-2"
                      : "text-gray-500"
                  } hover:border-b-2 pb-2 cursor-pointer border-red-500 px-1`}
                >
                  Intigration
                </p>
                <p
                  onClick={() => {
                    setselectedOption("submissions");
                  }}
                  className={`${
                    selectedOption === "submissions"
                      ? " text-black border-b-2"
                      : "text-gray-500"
                  } hover:border-b-2  pb-2  cursor-pointer border-red-500 px-1`}
                >
                  Submissions
                </p>
                <p
                  onClick={() => {
                    setselectedOption("setting");
                  }}
                  className={`${
                    selectedOption === "setting"
                      ? " text-black border-b-2"
                      : "text-gray-500"
                  } hover:border-b-2 pb-2  cursor-pointer border-red-500 px-1 `}
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
