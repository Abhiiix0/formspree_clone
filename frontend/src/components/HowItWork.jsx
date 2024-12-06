import React from "react";

const HowItWork = () => {
  const htmlCode = `<form action="https://formspree.io/f/{form_id}" method="post">
`;

  const htmlCode2 = `<input name="email" id="email" type="email" />`;

  return (
    <div className="max-w-[900px] bg-transparent self-center">
      {/* Heading Section */}
      <div className="flex flex-col gap-3 md:gap-6">
        <h1 className="text-center text-white text-2xl md:text-5xl font-bold">
          How it works
        </h1>
        <p className="text-gray-200 text-sm md:text-lg text-center">
          With a couple of changes to your existing form, your Formspree
          submissions will start appearing in the Formspree dashboard.
        </p>
      </div>

      {/* Instructions */}
      <div className="flex flex-col mb-5 mt-10 gap-6 sm:gap-12">
        {/* Step 1 */}
        <div className="flex flex-col gap-2 sm:gap-3">
          <p className="font-bold text-white text-lg md:text-3xl">
            1. Create a form on Formspree
          </p>
          <p className="text-gray-500 text-base md:text-xl">
            Create a{" "}
            <span className="font-bold text-red-500">free account</span> and
            choose a new form.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col gap-2 sm:gap-3">
          <p className="font-bold text-white text-lg md:text-3xl">
            2. Update your form's{" "}
            <span className="bg-red-100 px-1 md:px-2 py-1 text-lg md:text-3xl rounded-md text-red-500">
              action
            </span>
          </p>
          <p className="text-gray-500 text-base md:text-xl">
            Replace with the form endpoint in your Formspree account.
          </p>
          <p className="bg-[#1e1e1e] text-white text-[10px] md:text-base py-3 px-2 sm:p-4 rounded-md overflow-x-auto">
            <code>{htmlCode}</code>
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col gap-2 sm:gap-3">
          <p className="font-bold text-white text-lg md:text-3xl">
            3. Set the{" "}
            <span className="bg-red-100 px-1 md:px-2 py-1 text-lg md:text-3xl rounded-md text-red-500">
              name
            </span>{" "}
            attribute on each{" "}
            <span className="bg-red-100 px-1 md:px-2 py-1 text-lg md:text-3xl rounded-md text-red-500">
              input
            </span>{" "}
            tag
          </p>
          <p className="text-gray-500 text-base md:text-xl">
            Formspree will save any fields with a{" "}
            <span className="bg-red-100 px-2 py-1 rounded-md text-red-500">
              name
            </span>{" "}
            attribute.
          </p>
          <p className="bg-[#1e1e1e] text-white text-[10px] md:text-base py-3 px-2 sm:p-4 rounded-md overflow-x-auto">
            <code>{htmlCode2}</code>
          </p>
        </div>

        {/* Final Text */}
        <p className="text-center text-lg md:text-2xl font-medium text-gray-100">
          Now submit your form and see what happens!
        </p>
      </div>
    </div>
  );
};

export default HowItWork;
