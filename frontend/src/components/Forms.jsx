import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllForm } from "../Service/Api";
import { Modal } from "antd";
import { useForm } from "react-hook-form";

const Forms = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const forms = [
    {
      id: 1,
      name: "Form 1",
    },
    {
      id: 2,
      name: "Form 2",
    },
    {
      id: 3,
      name: "Form 2",
    },
  ];
  const [selectedForm, setselectedForm] = useState();
  const fetchForms = async () => {
    console.log(process.env.BACKEND_URL);
    // fetch data from server
    try {
      const res = await getAllForm();
      console.log(res.data);
      const result = await res.json();
      // setForms(result.data)
      console.log(result);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const submitData = (data) => {
    console.log(data);
  };
  useEffect(() => {
    fetchForms();
  }, []);
  const [addNewModal, setaddNewModal] = useState(false);
  return (
    <div>
      <Modal
        open={addNewModal}
        onCancel={() => {
          setaddNewModal(false);
          reset();
        }}
        footer={false}
        // closeIcon={false}
        title={<p className=" text-lg">Create Form</p>}
      >
        <form onSubmit={handleSubmit(submitData)}>
          <div className=" sm:text-lg flex flex-col w-full mb-2">
            <label htmlFor="formName" className=" text-[1rem]">
              Form Name
            </label>
            <input
              className=" outline-none py-1 px-3 rounded-md border bg-slate-100"
              type="text"
              //   placeholder="Enter form name"
              id="formName"
              {...register("formName", {
                required: "Form name is required",
              })}
            />
            {errors?.formName && (
              <p className="text-red-500 text-sm">{errors?.formName.message}</p>
            )}
          </div>
          <div className=" sm:text-lg flex flex-col w-full">
            <label htmlFor="email" className=" text-[1rem]">
              Send emails to
            </label>
            <input
              className=" outline-none py-1 px-3 rounded-md border bg-slate-100"
              type="text"
              id="email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors?.email && (
              <p className="text-red-500 text-sm">{errors?.email.message}</p>
            )}
          </div>
          <div className=" flex justify-end gap-2 mt-3">
            <button
              className=" hidden px-3 py-1.5 border rounded-md"
              type="button"
            >
              Cancel
            </button>{" "}
            <button
              className=" px-3 py-1.5 border rounded-md bg-blue-500 hover:bg-blue-700 text-white"
              type="submit"
            >
              Create Form
            </button>
          </div>
        </form>
      </Modal>
      <button
        onClick={() => setaddNewModal(true)}
        className=" h-12 hover:bg-slate-100 w-full rounded-md border"
      >
        <PlusOutlined className=" mr-2" />
        Add New
      </button>
      <div className=" mt-4">
        <h2 className="text-lg font-bold my-1 ">Forms</h2>
        <div className=" flex flex-col gap-2">
          {forms.map((form) => (
            <p
              key={form.id}
              onClick={() => {
                setselectedForm(form.id);
              }}
              className={` ${
                selectedForm === form.id && "bg-slate-100"
              } font-medium cursor-pointer p-1 m-0 border hover:bg-slate-100 rounded-md`}
            >
              {form?.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forms;
