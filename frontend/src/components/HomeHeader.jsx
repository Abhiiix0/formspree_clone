import React from "react";
import { useNavigate } from "react-router-dom";

const HomeHeader = () => {
  const navigate = useNavigate();
  const goToLogin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className=" py-4 sm:p-6">
      <div className=" isolate aspect-video  border border-blue-300  bg-blue-100 bg-white/25  rounded-full ring-1 ring-black/5  backdrop-blur-4xl h-[60px] md:h-20 w-full flex justify-between items-center px-6 md:px-10">
        <p className=" cursor-pointer font-bold text-lg md:text-2xl">LOGO</p>
        <div className=" flex items-center justify-center gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="  btn-grad tracking-wide text-[12px] md:text-lg bg-blue-500 rounded-md text-white font-medium px-2 py-2"
          >
            Get started
          </button>
          <button
            onClick={() => goToLogin()}
            className="  tracking-wide bg-blue-100 text-[12px] hover:opacity-80 rounded-md md:text-lg text-blue-500 font-medium px-2 py-2"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
