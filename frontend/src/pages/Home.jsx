import React from "react";
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className=" flex  flex-col justify-between h-screen">
      <HomeHeader />
      <div className=" grid place-content-center h-full gap-6">
        <h1 className=" text-black uppercase text-6xl font-bold">
          The form solution for any developer
        </h1>
        <p className=" text-gray-500 uppercase font-medium text-2xl text-center">
          Use your own frontend code. Submit to our API. We'll handle the rest.
        </p>
        <div className=" flex items-center justify-center">
          <button className=" borders btn-grad tracking-wide md:text-2xl bg-blue-500 rounded-md text-white font-medium px-8 py-3">
            Get started
          </button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
