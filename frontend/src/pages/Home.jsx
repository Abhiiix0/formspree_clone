import React from "react";
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Link, useNavigate } from "react-router-dom";
import HowItWork from "../components/HowItWork";
import HomeBanner from "../components/HomeBanner";
const Home = () => {
  const navigate = useNavigate();
  const htmlCode = `
<form action="https://formspree.io/f/{form_id}" method="post">
  <label for="email">Your Email</label>
  <input name="Email" id="email" type="email">
  <button type="submit">Submit</button>
</form>
    `;
  return (
    <div className="gradient flex px-4 sm:px-12  flex-col justify-between h-full">
      <HomeHeader />
      <HomeBanner />
      <HowItWork />
      <div className=" rounded-md bg-gray-800 h-[300px] sm:h-[400px] mb-12 mt-9 sm:mb-20 sm:mt-[70px] p-4 sm:p-8 w-full">
        <div className=" h-[300px] sm:h-[400px] grid place-content-center">
          <h2 className=" text-white text-center text-2xl sm:text-5xl font-bold tracking-wider">
            Create a working form in seconds.
          </h2>
          <p className=" text-gray-400 my-4 text-center text-base sm:text-2xl font-medium tracking-wider">
            Grab your form code and see form submissions in under a minute.
          </p>
          <div className=" grid place-content-center">
            <Link className=" borders w-fit self-center text-center btn-grad tracking-wide md:text-2xl bg-blue-500 rounded-md text-white font-medium px-5 py-2 sm:px-8 sm:py-3">
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <Footer dark={true}></Footer>
    </div>
  );
};

export default Home;
