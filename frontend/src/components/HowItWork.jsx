import React from "react";

const HowItWork = () => {
  return (
    <div className=" w-[900px] bg-transparent self-center ">
      <div className=" flex flex-col gap-3 md:gap-6">
        <h1 className=" text-center text-white text-3xl md:text-6xl font-bold">
          How it works
        </h1>
        <p className=" text-gray-200   md:text-2xl text-center">
          With a couple of changes to your existing form, your Formspree
          submissions will <br className=" hidden sm:block" /> start appearing
          in the Formspree dashboard
        </p>
      </div>
      <div className=" flex flex-col my-8 gap-[70px]">
        <div className=" flex flex-col gap-4">
          <p className=" font-bold text-white text-3xl">
            1. Create a form on Formspree
          </p>
          <p className="text-2xl text-gray-500 font-medium">
            Create a{" "}
            <span className=" font-bold text-2xl text-red-500">
              free account
            </span>{" "}
            and choose new form.
            {/* <span className=" font-bold text-xl text-gray-700"></span> */}
          </p>
        </div>
        <div className=" flex flex-col gap-4">
          <p className=" text-white font-bold text-3xl">
            2. Update your form's{" "}
            <span className=" font-bold text-2xl bg-red-100 px-2 py-1  rounded-md text-red-500">
              action
            </span>
          </p>
          <p className="text-2xl  text-gray-500 font-medium">
            Replace with the form endpoint in your Formspree account.
          </p>
          <p className=" text-lg text-white border-l-4 border-gray-800 pl-3">
            Make sure your form uses{" "}
            <span className=" bg-red-100 px-2 py-1 w-fit text-red-500 rounded-md">
              method="post"
            </span>
          </p>
        </div>
        <div className=" flex flex-col gap-4">
          <p className=" font-bold  text-white text-3xl">
            3. Set the{" "}
            <span className=" font-bold text-2xl bg-red-100 px-2 py-1  rounded-md text-red-500">
              name
            </span>{" "}
            attribute on each{" "}
            <span className=" font-bold text-2xl bg-red-100 px-2 py-1  rounded-md text-red-500">
              input
            </span>{" "}
            tag
          </p>
          <p className="text-2xl  text-gray-500 font-medium">
            Formspree will save any fields with a{" "}
            <span className=" text-2xl bg-red-100 px-2 py-1  rounded-md text-red-500">
              name
            </span>{" "}
            attribute.
          </p>
        </div>
        <p className=" text-center text-2xl font-medium text-gray-100">
          Now submit your form and see what happens!
        </p>
      </div>
    </div>
  );
};

export default HowItWork;
