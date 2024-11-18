import { LogoutOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

const DashbaordHeader = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="h-[10vh] bg-white w-full">
      <div className=" flex justify-between border-b h-full items-center px-4">
        <p className=" cursor-pointer font-bold text-2xl">LOGO</p>
        <div className=" cursor-pointer flex gap-6 items-center justify-center">
          <p className="cursor-pointer text-lg">Dashboard</p>
          <p className="text-lg cursor-pointer">Forms</p>
          <p className="text-lg cursor-pointer">Account</p>
          <p onClick={() => logout()} className=" text-lg cursor-pointer">
            <LogoutOutlined />
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashbaordHeader;
