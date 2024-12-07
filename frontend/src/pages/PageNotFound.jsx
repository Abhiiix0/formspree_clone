import React from "react";
import { Link } from "react-router-dom";
import eazyformlogo from "../assets/eazyform.png";
const PageNotFound = () => {
  return (
    <div className="h-screen relative flex items-center justify-center bg-gray-100">
      <Link
        to="/"
        className=" w-full  absolute top-3 sm:top-4 cursor-pointer font-bold text-lg md:text-2xl text-white"
      >
        <img
          src={eazyformlogo}
          className=" h-7 md:h-10 px-4 sm:px-12 bg-transparent rounded-sm object-contain"
          alt="EazyForm Logo"
        />
      </Link>
      <div className="text-center bg-white p-10 rounded-md shadow-lg">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-2xl text-gray-700 mt-4">Oops! Page not found</p>
        <p className="text-gray-500 mt-2">
          We couldn't find the page you're looking for. It might have been moved
          or deleted.
        </p>
        <button
          className="mt-6 px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          onClick={() => (window.location.href = "/")}
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
