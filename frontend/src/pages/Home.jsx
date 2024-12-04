import React from "react";
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useNavigate } from "react-router-dom";
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
      {/* <HowItWork /> */}
      <div className=" rounded-md bg-gray-500 h-[400px] w-full">
        <div className=" h-[400px]">
          <h2 className=" text">Create a working form in seconds.</h2>
          <p>Grab your form code and see form submissions in under a minute.</p>
          <p>advanced Dashboard </p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
