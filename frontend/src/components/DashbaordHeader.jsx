import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserData } from "../Service/Api";
import { useAppContext } from "../context/AppContext";
import { Drawer } from "antd";
import eazyformlogo from "../assets/eazyform.png";
const DashbaordHeader = () => {
  const navigate = useNavigate();
  const { setSelectedForm, setUser } = useAppContext();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [menu, setmenu] = useState(false);
  const onClose = () => {
    setmenu(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await getUserData();
      const result = await res.json();

      setUser(result.data);
    };
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" h-[70px] sm:h-20 bg-white w-full">
      <div className=" flex justify-between border-b h-full items-center px-4">
        <p className=" cursor-pointer font-bold text-2xl">
          <Link
            to="/"
            className=" w-full cursor-pointer font-bold text-lg md:text-2xl text-white"
          >
            <img
              src={eazyformlogo}
              className=" h-7 md:h-10 bg-transparent rounded-sm object-contain"
              alt="EazyForm Logo"
            />
          </Link>
        </p>
        <div className="hidden sm:flex gap-6 items-center  justify-center">
          <Link
            onClick={() => {
              setSelectedForm("");
            }}
            to="/dashboard"
            className={`cursor-pointer font-medium text-lg`}
          >
            Dashboard
          </Link>
          {/* <p className="text-lg cursor-pointer font-medium">Forms</p> */}
          <Link to="/account" className={`cursor-pointer font-medium text-lg `}>
            Account
          </Link>
          <p
            onClick={() => logout()}
            className=" text-xl font-medium cursor-pointer"
          >
            <LogoutOutlined className=" text-red-500 " />
          </p>
        </div>
        <MenuOutlined
          onClick={() => setmenu(true)}
          className=" cursor-pointer text-2xl sm:hidden"
        />
      </div>
      <Drawer
        title={
          <div className=" flex w-full  justify-end">
            <Link
              to="/"
              className=" cursor-pointer font-bold text-lg md:text-2xl text-white"
            >
              <img
                src={eazyformlogo}
                className=" h-7 md:h-10 bg-transparent rounded-sm object-contain"
                alt="EazyForm Logo"
              />
            </Link>
          </div>
        }
        onClose={onClose}
        open={menu}
      >
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
            <Link to="/account" className="font-medium cursor-pointer">
              Account
            </Link>
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

export default React.memo(DashbaordHeader);
