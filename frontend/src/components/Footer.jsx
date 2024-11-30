import React, { useEffect } from "react";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";

const Footer = () => {
  const { id } = useParams(); // Get the id from the URL
  const { fetchSIngleForm } = useAppContext();
  useEffect(() => {
    if (id) {
      fetchSIngleForm(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  console.log("footer");
  return (
    <footer className="h-fit py-4 sm:py-6 border-t bg-white flex flex-col md:flex-row items-center justify-between px-4 md:px-12">
      {/* Top Section - Mobile Only */}
      <div className="text-gray-600 text-sm mb-3 md:mb-0">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </div>

      {/* Middle Section - Links */}
      <div className="flex flex-wrap gap-4 text-gray-500 mb-3 md:mb-0">
        <a href="/about" className="hover:text-blue-600">
          About Us
        </a>
        <a href="/services" className="hover:text-blue-600">
          Services
        </a>
        <a href="/contact" className="hover:text-blue-600">
          Contact
        </a>
        <a href="/privacy" className="hover:text-blue-600">
          Privacy Policy
        </a>
      </div>

      {/* Bottom Section - Social Icons */}
      <div className="flex gap-3 text-gray-500">
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
