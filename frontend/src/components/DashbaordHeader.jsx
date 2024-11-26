import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAllForm, getUserData } from "../Service/Api";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { Drawer } from "antd";

const DashbaordHeader = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const { selectedForm, setSelectedForm, setUser } = useAppContext();
  const [menu, setmenu] = useState(false);
  const onClose = () => {
    setmenu(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await getUserData();
      const result = await res.json();
      console.log(result);
      setUser(result.data);
    };
    fetchUserData();
  }, []);

  return (
    <div className="h-[10vh] bg-white w-full">
      <div className=" flex justify-between border-b h-full items-center px-4">
        <p className=" cursor-pointer font-bold text-2xl">LOGO</p>
        <div className="hidden sm:flex gap-6 items-center  justify-center">
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
          <p onClick={() => logout()} className=" text-xl cursor-pointer">
            <LogoutOutlined className=" text-red-500 " />
          </p>
        </div>
        <MenuOutlined
          onClick={() => setmenu(true)}
          className=" cursor-pointer text-2xl sm:hidden"
        />
      </div>
      <Drawer title="Logo" onClose={onClose} open={menu}>
        <div className=" flex flex-col gap-3 justify-between h-full ">
          <div className=" flex flex-col gap-3">
            <Link
              onClick={() => {
                setSelectedForm("");
              }}
              to="/dashboard"
              className="cursor-pointer font-medium"
            >
              Dashboard
            </Link>
            <Link className="font-medium cursor-pointer">Forms</Link>
            <Link className="font-medium cursor-pointer">Account</Link>
          </div>
          <p
            onClick={() => logout()}
            className=" bg-red-500 hover:bg-red-700 rounded-md text-white py-1 text-center cursor-pointer"
          >
            {/* <LogoutOutlined /> */}
            Logout
          </p>
        </div>
      </Drawer>
    </div>
  );
};

export default DashbaordHeader;
