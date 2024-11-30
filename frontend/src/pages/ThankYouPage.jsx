import React from "react";

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
          <p className=" text-center text-[12px]  text-gray-600 font-medium">
            Powered by myCompanyName.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
