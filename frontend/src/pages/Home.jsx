import React, { useEffect, useState } from "react";
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";

import { Link, useLocation } from "react-router-dom";
import HowItWork from "../components/HowItWork";
import HomeBanner from "../components/HomeBanner";
const Home = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqs = [
    {
      question: "What is EazyForm?",
      answer:
        "EazyForm is an easy-to-use form submission service that allows you to send form data from your website directly to your email inbox or store it in a database.",
    },
    {
      question: "How do I set up a form with EazyForm?",
      answer:
        "Setting up a form is simple: 1. Create a form on your website with the fields you need. 2. Point the form action to our API endpoint. 3. Customize your success/error messages. 4. Submit the form and you’ll receive the data in your email or dashboard.",
    },
    {
      question: "Is it safe to use EazyForm for my forms?",
      answer:
        "Yes! We use SSL encryption and offer CAPTCHA protection to ensure security.",
    },
    {
      question: "How do I receive form submissions?",
      answer:
        "You can receive form submissions via email or store them in your account’s dashboard. Our service sends a notification to your specified email address every time a form is submitted.",
    },
    {
      question: "Is it free to use?",
      answer:
        "Yes, you can start using EazyForm for free! We offer 50 free form submissions. After that, you can purchase additional submission credits to keep using the service.",
    },
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const location = useLocation();
  useEffect(() => {
    if (location.hash === "#faq") {
      const faqElement = document.getElementById("faq");
      if (faqElement) {
        faqElement.scrollIntoView({ behavior: "smooth" });
      }
    }
    if (location.hash === "#tutorial") {
      const faqElement = document.getElementById("tutorial");
      if (faqElement) {
        faqElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <div className="gradient  flex px-4 sm:px-12  flex-col justify-between h-full">
      <HomeHeader />
      <HomeBanner />
      <span id="tutorial" className=" mb-8"></span>
      <HowItWork />
      {/* FAQ Section */}
      <div id="faq" className=" w-full lg:w-[900px] mx-auto py-8 px-4 sm:px-0">
        <h2 className=" text-xl md:text-3xl font-semibold text-center mb-6 text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 ">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border overflow-hidden  border-gray-200   rounded-lg"
            >
              <button
                onClick={() => toggleAnswer(index)}
                className="w-full text-left px-2 py-2 sm:px-4 sm:py-3 bg-white/20 backdrop-blur-md overflow-hidden rounded-t-lg focus:outline-none"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold md:text-lg text-white">
                    {faq.question}
                  </h3>
                  <span className=" text-white text-2xl">
                    {activeIndex === index ? "-" : "+"}
                  </span>
                </div>
              </button>
              {activeIndex === index && (
                <div className=" px-2 py-2 sm:px-4 sm:py-3 bg-gray-50 rounded-b-lg">
                  <p className="text-gray-700 text-sm md:text-base">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
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
