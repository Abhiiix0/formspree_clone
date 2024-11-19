import { LogoutOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAllForm } from "../Service/Api";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const DashbaordHeader = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const { selectedForm, setSelectedForm } = useAppContext();
  return (
    <div className="h-[10vh] bg-white w-full">
      <div className=" flex justify-between border-b h-full items-center px-4">
        <p className=" cursor-pointer font-bold text-2xl">LOGO</p>
        <div className=" cursor-pointer flex gap-6 items-center justify-center">
          <Link
            onClick={() => {
              setSelectedForm("");
            }}
            to="/dashboard"
            className="cursor-pointer text-lg"
          >
            Dashboard
          </Link>
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
