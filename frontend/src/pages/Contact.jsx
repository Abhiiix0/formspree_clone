import React from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import HomeHeader from "../components/HomeHeader";

const Contact = () => {
  return (
    <div>
      {" "}
      <div className="gradient flex px-4 sm:px-12  flex-col justify-between h-full">
        <HomeHeader />
        <div className=" border my-20 bg-white/20 rounded-md  flex flex-col gap-8 py-20 px-24">
          <div className=" flex  gap-6">
            <div className=" w-full text-white text-5xl font-bold tracking-wider">
              Let's Chat. <br /> Reach Out to Us
            </div>
            <div className=" w-full text-white">
              Have questions or feedback? We're here to help. <br /> Send us a
              message and we'll respond within 24 hours
            </div>
          </div>
          <div className=" flex gap-6   rounded-md">
            <div className=" w-full flex flex-col gap-7">
              <div>
                <label htmlFor="name" className=" text-white">
                  Name
                </label>
                <input
                  type="text"
                  className=" p-2 w-full rounded-md outline-none border"
                />
              </div>
              <div>
                <label htmlFor="email" className=" text-white">
                  Email
                </label>
                <input
                  type="text"
                  className=" p-2 w-full rounded-md outline-none border"
                />
              </div>
            </div>
            <div className=" w-full">
              <label htmlFor="Message" className=" text-white">
                Message
              </label>
              <textarea
                type="text"
                rows={5}
                className=" p-2 w-full rounded-md outline-none border"
              />
            </div>
          </div>
        </div>
        <Footer dark={true}></Footer>
      </div>
    </div>
  );
};

export default Contact;
