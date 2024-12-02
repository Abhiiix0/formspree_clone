import React from "react";

const HomeHeader = () => {
  return (
    <div className=" p-6">
      <div className=" isolate aspect-video  border border-gray-300  bg-blue-100 bg-white/25  rounded-full ring-1 ring-black/5  backdrop-blur-4xl h-[70px] sm:h-20 w-full flex justify-between items-center px-3 md:px-10">
        <p className=" cursor-pointer font-bold text-2xl">LOGO</p>
        <div className=" flex items-center justify-center gap-4">
          <button className="  btn-grad tracking-wide md:text-lg bg-blue-500 rounded-md text-white font-medium px-4 py-2">
            Get started
          </button>
          <button className="  tracking-wide bg-blue-100 rounded-md md:text-lg text-blue-500 font-medium px-4 py-2">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
