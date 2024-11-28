import React, { useState } from "react";
import DashbaordHeader from "../components/DashbaordHeader";
import Footer from "../components/Footer";
import BillingComp from "../components/BillingComp";
import AccComponent from "../components/AccComponent";
import { CreditCardOutlined, SettingOutlined } from "@ant-design/icons";

const Account = () => {
  const [activeTab, setActiveTab] = useState("account"); // Track the selected tab (Account/Billing)

  return (
    <div className=" bg-gray-100">
      <DashbaordHeader />
      <div className=" h-screen  flex md:flex-row flex-col w-full">
        {/* Left Sidebar */}
        <div className=" w-full md:w-[17%] bg-white p-4 border-r">
          <h2 className="text-xl hidden md:block font-semibold mb-6">
            Settings
          </h2>
          <div className=" flex flex-row md:flex-col">
            <button
              className={`w-full py-2 px-4 md:mb-2  rounded-l-md md:rounded-md text-center md:text-left ${
                activeTab === "account"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveTab("account")}
            >
              <SettingOutlined className=" mr-1" /> Account
            </button>
            <button
              className={`w-full py-2 text-center px-4 rounded-r-md md:rounded-md md:text-left ${
                activeTab === "billing"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveTab("billing")}
            >
              <CreditCardOutlined className="mr-1" /> Billing
            </button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className=" md:w-[83%] p-3">
          {activeTab === "account" ? <AccComponent /> : <BillingComp />}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Account;
