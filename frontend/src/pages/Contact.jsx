import React from "react";
import { useForm } from "react-hook-form";
import Footer from "../components/Footer";
import HomeHeader from "../components/HomeHeader";
import { Helmet } from "react-helmet";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data: ", data);
    alert("Message sent successfully!");
  };

  return (
    <div>
      <Helmet>
        {/* Page Title */}
        <title>Contact Us - EazyForm</title>

        {/* Meta Description */}
        <meta
          name="description"
          content="Get in touch with the EazyForm team for inquiries, support, or feedback. We're here to assist you!"
        />

        {/* Viewport for Responsive Design */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Keywords */}
        <meta
          name="keywords"
          content="EazyForm, Contact Us, Support, Customer Service, Feedback"
        />

        {/* Open Graph Tags for Social Sharing */}
        <meta property="og:title" content="Contact Us - EazyForm" />
        <meta
          property="og:description"
          content="Have questions or need help? Contact the EazyForm team for prompt assistance."
        />
      </Helmet>
      <div className="gradient flex px-4 sm:px-12 flex-col justify-between min-h-screen">
        <HomeHeader />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-12 mt-10 sm:mb-20 bg-white/10 shadow-sm backdrop-blur-xl rounded-md flex flex-col gap-5 sm:gap-8 py-10 px-6 sm:py-20 sm:px-12 lg:px-24"
        >
          <div className="flex flex-col lg:mb-3 lg:flex-row gap-4 sm:gap-6">
            <div className="w-full lg:w-1/2 text-white text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider">
              Let's Chat. <br /> Reach Out to Us
            </div>
            <div className="w-full lg:w-1/2 text-white text-base sm:text-lg">
              Have questions or feedback? We're here to help.{" "}
              <br className="hidden lg:block" />
              Send us a message and we'll respond within 24 hours.
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 rounded-md">
            <div className="w-full lg:w-1/2 flex flex-col gap-4 sm:gap-6">
              <div>
                <label htmlFor="name" className="text-white block mb-2">
                  Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  className="p-2 w-full rounded-md outline-none border"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="text-white block mb-2">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  type="email"
                  className="p-2 w-full rounded-md outline-none border"
                />
                {errors.email && (
                  <p className="text-red-600  text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <label htmlFor="message" className="text-white block mb-2">
                Message
              </label>
              <textarea
                {...register("message", { required: "Message is required" })}
                rows={5}
                className="p-2 w-full rounded-md outline-none border"
              />
              {errors.message && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-sm sm:text-lg bg-blue-700 rounded-md font-medium text-white px-6 py-2 tracking-wider"
            >
              Send Message
            </button>
          </div>
        </form>
        <div className="mb-16 sm:mb-20">
          <h2 className="text-white text-xl sm:text-2xl font-bold mb-4">
            Find Us Here:
          </h2>
          <div className="w-full h-64 rounded-md overflow-hidden shadow-lg">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8678459658436!2d144.9574133!3d-37.8152064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce840!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sin!4v1670583064693!5m2!1sen!2sin"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
        </div>
        <Footer dark={true}></Footer>
      </div>
    </div>
  );
};

export default Contact;
