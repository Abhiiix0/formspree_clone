import React from "react";
import eazyformlogo from "../assets/eazyform.png";
const FromNotSelect = () => {
  return (
    <div className="rounded-md bg-gradient-to-r bg-white m-3 h-[620px] w-[80vw] p-6 shadow">
      <div className="flex justify-center items-center h-full flex-col space-y-4 text-center">
        <h1 className="text-black text-3xl font-bold">WELCOME</h1>
        <p className="text-black text-xl font-medium">
          Create a new Form to get started
        </p>
        <div className=" mt-4">
          <img src={eazyformlogo} className=" h-20 opacity-30" alt="" />
        </div>
      </div>
    </div>
  );
};

export default FromNotSelect;
