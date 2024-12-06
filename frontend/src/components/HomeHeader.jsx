import React, { useState } from "react";
import eazyformlogo from "../assets/eazyform.png";
import { Link, useNavigate } from "react-router-dom";
import { MenuUnfoldOutlined, CloseOutlined } from "@ant-design/icons";

const HomeHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for slider visibility
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
    <div className="relative">
      <div className=" h-[50px] md:h-[70px] w-full flex justify-between items-center">
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
        <div className=" hidden lg:flex  w-full gap-6 justify-center items-center">
          <p className=" text-white hover:text-blue-500 font-medium tracking-wider">
            About us
          </p>
          <p className=" text-white hover:text-blue-500 font-medium tracking-wider">
            Tutorial
          </p>
          <Link
            to="/contact"
            className=" text-white hover:text-blue-500 font-medium tracking-wider"
          >
            Contact
          </Link>
        </div>
        <div className="flex w-full items-center justify-end gap-2 sm:gap-4">
          <span className="hidden lg:block">
            <button
              onClick={() => navigate("/signup")}
              className="btn-grad tracking-wide text-[12px] md:text-lg bg-blue-500 rounded-md text-white font-medium px-2 sm:px-3 py-[5px] sm:py-2"
            >
              Get started
            </button>
          </span>
          <button
            onClick={() => goToLogin()}
            className="hidden lg:block tracking-wide bg-blue-100 text-[12px] hover:opacity-80 rounded-md md:text-lg text-blue-500 font-medium px-2 sm:px-3 py-[5px] sm:py-2"
          >
            Login
          </button>
          {isMenuOpen ? (
            <CloseOutlined
              className="text-3xl md:text-4xl text-white lg:hidden cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            />
          ) : (
            <MenuUnfoldOutlined
              className="text-3xl md:text-4xl text-white lg:hidden cursor-pointer"
              onClick={() => setIsMenuOpen(true)}
            />
          )}
        </div>
      </div>
      {/* Glass blur slider */}
      {isMenuOpen && (
        <div className="absolute top-[50px] rounded-md p-4 right-0 h-[350px] w-full bg-white/10 backdrop-blur-md shadow-md flex flex-col items-center justify-center gap-4 z-50 transition-transform duration-300">
          <p
            className="text-white hover:text-blue-500 font-medium tracking-wider cursor-pointer"
            onClick={() => navigate("/about")}
          >
            About us
          </p>
          <p
            className="text-white hover:text-blue-500 font-medium tracking-wider cursor-pointer"
            onClick={() => navigate("/tutorial")}
          >
            Tutorial
          </p>
          <p
            className="text-white hover:text-blue-500 font-medium tracking-wider cursor-pointer"
            onClick={() => navigate("/contact")}
          >
            Contact
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="btn-grad w-full tracking-wide text-sm bg-blue-500 rounded-md text-white font-medium px-4 py-2"
          >
            Get started
          </button>
          <button
            onClick={() => goToLogin()}
            className="tracking-wide border w-full bg-blue-100 text-sm hover:opacity-80 rounded-md text-blue-500 font-medium px-4 py-2"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeHeader;
