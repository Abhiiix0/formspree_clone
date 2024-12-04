import React from "react";
import { useNavigate } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
const HomeBanner = () => {
  const navigate = useNavigate();
  const htmlCode = `
  <form action="https://formspree.io/f/{form_id}" method="post">
    <label for="email">Your Email</label>
    <input name="Email" id="email" type="email">
    <button type="submit">Submit</button>
  </form>
      `;
  return (
    <div className="  h-[87vh] grid place-content-center">
      <div className="  flex flex-col items-center justify-center gap-4 md:gap-6">
        <div className=" grid place-content-center h-full gap-4 md:gap-6">
          <h1 className=" text-center text-white uppercase text-3xl md:text-6xl font-bold">
            The form solution for any developer
          </h1>
          <p className=" text-gray-500 px-16 uppercase font-medium  md:text-2xl text-center">
            Use your own frontend code. Submit to our API. We'll handle the
            rest.
          </p>
          <div className=" flex items-center justify-center">
            <button
              onClick={() => navigate("/signup")}
              className=" borders btn-grad tracking-wide md:text-2xl bg-blue-500 rounded-md text-white font-medium px-8 py-3"
            >
              Get started
            </button>
          </div>
        </div>
        <div className="  hidden md:block sm:w-fit h-fit self-center ">
          <SyntaxHighlighter
            language="javascript"
            style={vscDarkPlus}
            customStyle={{
              borderRadius: "8px",
              fontSize: "25px", // Adjust the font size here
              background: "#1e1e1e",
              lineHeight: "0.95", // Adjust the line height to control spacing
              padding: "10px", // Set consistent padding
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
            codeTagProps={{
              style: { fontSize: "0.95rem" }, // Force font size here
            }}
          >
            {htmlCode}
          </SyntaxHighlighter>
        </div>
        <div className=" w-full md:hidden h-fit self-center ">
          <SyntaxHighlighter
            language="javascript"
            style={vscDarkPlus}
            customStyle={{
              borderRadius: "8px",
              fontSize: "25px", // Adjust the font size here
              background: "#1e1e1e",
              lineHeight: "0.65", // Adjust the line height to control spacing
              padding: "10px", // Set consistent padding
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
            codeTagProps={{
              style: { fontSize: "0.65rem" }, // Force font size here
            }}
          >
            {htmlCode}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
