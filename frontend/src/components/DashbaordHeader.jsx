import { LogoutOutlined } from "@ant-design/icons";
import React from "react";

const DashbaordHeader = () => {
  return (
    <div className="h-[10vh] bg-white w-full">
      <div className=" flex justify-between border-b h-full items-center px-4">
        <p className=" font-bold text-2xl">LOGO</p>
        <div className=" flex gap-6 items-center justify-center">
          <p className="text-lg">Dashboard</p>
          <p className="text-lg">Forms</p>
          <p className="text-lg">Account</p>
          <p className="text-lg">
            <LogoutOutlined />
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashbaordHeader;
