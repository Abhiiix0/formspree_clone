import React, { useEffect } from "react";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";

const Footer = ({ dark }) => {
  const { id } = useParams(); // Get the id from the URL
  const { fetchSIngleForm } = useAppContext();
  useEffect(() => {
    if (id) {
      fetchSIngleForm(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <footer
      className={`h-fit py-4 sm:py-6 border-t ${
        dark ? "bg-transparent" : " bg-white"
      } flex flex-col md:flex-row items-center justify-between px-4 md:px-0`}
    >
      {/* Top Section - Mobile Only */}
      <div
        className={` text-sm mb-3  w-full md:mb-0 ${
          dark ? " text-white" : "text-gray-600"
        }`}
      >
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </div>

      {/* Middle Section - Links */}
      <div className="flex flex-wrap  w-full justify-center gap-4 text-gray-500 mb-3 md:mb-0">
        <a
          href="/about"
          className={`hover:text-blue-600 text-sm sm:text-base ${
            dark && "text-white"
          }`}
        >
          About Us
        </a>
        <a
          href="/services"
          className={`hover:text-blue-600 text-sm sm:text-base ${
            dark && "text-white"
          }`}
        >
          Services
        </a>
        <Link
          to="/contact"
          className={`hover:text-blue-600 text-sm sm:text-base ${
            dark && "text-white"
          }`}
        >
          Contact
        </Link>
        <a
          href="/privacy"
          className={`hover:text-blue-600 text-sm sm:text-base ${
            dark && "text-white"
          }`}
        >
          Privacy Policy
        </a>
      </div>

      {/* Bottom Section - Social Icons */}
      <div className="flex gap-3 w-full  justify-end text-gray-500">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookOutlined className="hover:text-blue-600 text-xl" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <TwitterOutlined className="hover:text-blue-400 text-xl" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramOutlined className="hover:text-pink-600 text-xl" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinOutlined className="hover:text-blue-800 text-xl" />
        </a>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
