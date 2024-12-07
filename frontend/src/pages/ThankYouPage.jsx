import React from "react";
import { Link } from "react-router-dom";
import eazyformlogo from "../assets/eazyform.png";
const ThankYouPage = () => {
  return (
    <div className="min-h-screen  px-4 bg-gray-50 flex items-center justify-center">
      <div className="max-w-lg  w-full bg-white py-8 md:p-8 rounded-lg shadow">
        <h1 className=" text-3xl md:text-5xl  font-semibold text-center text-teal-500 mb-2">
          Thank You for Your
        </h1>
        <h1 className=" text-3xl md:text-5xl  font-semibold text-center text-teal-500 mb-6">
          Submission!
        </h1>
        <p className="text-center text-gray-700 md:text-xl mb-6">
          The form was submitted successfully.
        </p>

        <div>
          <p className=" text-center text-[12px] flex items-center justify-center text-gray-600 font-medium">
            Powered by{" "}
            <Link
              to="/"
              className=" w-fit cursor-pointer font-bold text-lg md:text-2xl text-white"
            >
              <img
                src={eazyformlogo}
                className=" h-4 ml-2 md:h-5 bg-transparent rounded-sm object-contain"
                alt="EazyForm Logo"
              />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
