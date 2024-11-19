import React from "react";
import toast from "react-hot-toast";

// import "react-toastify/dist/ReactToastify.css";

const Intigration = () => {
  const endpointUrl = `${process.env.BACKEND_URL}/api/form/3796869e-be1f-4860-adba-7db5f4bd26b8`;

  const handleCopy = () => {
    navigator.clipboard.writeText(endpointUrl).then(() => {
      toast.success("Copied to clipboard!");
    });
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
        <div>
          <p className="uppercase border-b py-3 px-3 text-sm font-medium">
            Code examples
          </p>
          <div className="p-3">
            <div className="bg-black rounded-md h-[400px]"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Intigration;
