import React from "react";

const PageNotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
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
