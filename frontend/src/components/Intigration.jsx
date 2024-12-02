import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getSingleForm } from "../Service/Api";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
const Integration = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("HTML");
  const { id } = useParams(); // Get the id from the URL
  const handleCopy = () => {
    navigator.clipboard.writeText(endpointUrl).then(() => {
      toast.success("Copied to clipboard!");
    });
  };
  const { selectedForm, setSelectedForm, fetchSIngleForm } = useAppContext();
  useEffect(() => {
    fetchSIngleForm(id);
  }, [id]);

  const endpointUrl = `${process.env.REACT_APP_BACKEND_URL}/${selectedForm?.formId}`;

  const htmlCode = `
<!-- Place this form HTML wherever you want your form -->
<form
  action="${endpointUrl}"
  method="post"
>
  <div>
    <label for="name">Your Name:</label>
    <input type="text" id="name" name="name" required placeholder="Enter your name" />
  </div>

  <div>
    <label for="email">Your Email:</label>
    <input type="email" id="email" name="email" required placeholder="Enter your email" />
  </div>

  <div>
    <label for="message">Your Message:</label>
    <textarea id="message" name="message" required placeholder="Type your message here"></textarea>
  </div>

  <div>
    <button type="submit">Send</button>
  </div>
</form>
  `;

  const reactCode = `
  import React, { useState } from "react";

const MyForm = () => {
  const [formData, setFormData] = useState({ email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("${endpointUrl}", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Your Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="message">Your Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div>
        <button type="submit">Send</button>
      </div>
    </form>
  );
};

export default MyForm;

  `;

  const getCodeBlock = () => {
    return selectedLanguage === "HTML" ? htmlCode : reactCode;
  };

  return (
    <>
      <div className="shadow mb-3 w-full bg-white rounded-md">
        <div>
          <p className="border-b py-3 px-3 text-sm font-medium">
            FORM ENDPOINT
          </p>
          <div className="p-3">
            <div className="flex gap-2">
              <p className=" text-sm md:text-[16px] rounded-md  px-3 bg-slate-100 py-2 w-full">
                {endpointUrl}
              </p>
              <button
                className="h-11 border bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3"
                onClick={handleCopy}
              >
                Copy
              </button>
            </div>
            <p className="text-gray-500 text-sm pt-1 font-medium">
              Place this URL in the form's action attribute, set the method to
              POST, and add a name attribute to each input.
            </p>
          </div>
        </div>
      </div>
      <div className="shadow bg-white rounded-md">
        <div className=" mb-2">
          <p className="uppercase border-b py-3 px-3 text-sm font-medium">
            Code Examples
          </p>
          <div className="flex gap-3  px-2 pt-2">
            <button
              className={`px-4 py-1 rounded-md ${
                selectedLanguage === "HTML"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => setSelectedLanguage("HTML")}
            >
              HTML
            </button>
            <button
              className={`px-4 py-1 rounded-md ${
                selectedLanguage === "React"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => setSelectedLanguage("React")}
            >
              React
            </button>
          </div>
          <div className=" m-2 pb-1">
            <SyntaxHighlighter
              language="javascript"
              style={vscDarkPlus}
              customStyle={{
                borderRadius: "8px",
                fontSize: "0.875rem",
                background: "#1e1e1e",
              }}
            >
              {getCodeBlock()}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </>
  );
};

export default Integration;
