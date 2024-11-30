import React from "react";

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

        <p className="text-center text-gray-600 mb-6">
          If you need further assistance or have questions, feel free to contact
          us.
        </p>

        <div className="border-t-2 border-gray-200 my-6"></div>

        <h2 className="text-lg font-medium text-gray-700 mb-3">Need Help?</h2>
        <p className="text-gray-600">
          <strong>Email Support:</strong>{" "}
          <a
            href="mailto:support@xyzservice.com"
            className="text-teal-500 hover:underline"
          >
            support@xyzservice.com
          </a>
        </p>
        <p className="text-gray-600">
          <strong>Visit our website:</strong>{" "}
          <a
            href="https://www.xyzservice.com"
            className="text-teal-500 hover:underline"
          >
            www.xyzservice.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default SubmissionLimitReached;
