import React from "react";
import { Link } from "react-router-dom";
import eazyformlogo from "../assets/eazyform.png";
const SubmissionLimitReached = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-red-500 mb-6">
          Submission Limit Reached
        </h1>
        <p className="text-center text-gray-600 mb-6">
          You have reached the maximum number of submissions. Unfortunately, you
          can no longer submit at this time.
        </p>

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
  );
};

export default SubmissionLimitReached;
