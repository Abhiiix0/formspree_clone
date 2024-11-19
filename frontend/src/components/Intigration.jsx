import React, { useState } from "react";
import toast from "react-hot-toast";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
const Integration = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("HTML");

  const handleCopy = () => {
    navigator.clipboard.writeText(endpointUrl).then(() => {
      toast.success("Copied to clipboard!");
    });
  };

  const endpointUrl = `${process.env.BACKEND_URL}/api/form/3796869e-be1f-4860-adba-7db5f4bd26b8`;

  const htmlCode = `
<!-- Place this form HTML wherever you want your form -->
<form
  action="${endpointUrl}"
  method="POST"
>
  <label>
    Your email:
    <input type="email" name="email">
  </label>
  <label>
    Your message:
    <textarea name="message"></textarea>
  </label>
  <button type="submit">Send</button>
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
      <label>
        Your email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Your message:
        <textarea name="message" value={formData.message} onChange={handleChange}></textarea>
      </label>
      <button type="submit">Send</button>
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
      <div className="shadow mb-3 bg-white rounded-md">
        <div>
          <p className="border-b py-3 px-3 text-sm font-medium">
            FORM ENDPOINT
          </p>
          <div className="p-3">
            <div className="flex gap-2">
              <p className="flex rounded-md items-center px-3 bg-slate-100 py-2 w-full">
                {endpointUrl}
              </p>
              <button
                className="h-11 border rounded-md px-3"
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
