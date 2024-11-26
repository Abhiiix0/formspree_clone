import { PlusOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CreateForm, getAllForm } from "../Service/Api";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { useAppContext } from "../context/AppContext";
import encryptMessage from "../Helper/Encryption";
import { useNavigate } from "react-router-dom";
// import AppContext from "antd/es/app/context";

const Forms = () => {
  const navigate = useNavigate();
  const { selectedForm, setSelectedForm, user, setUser } = useAppContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  //   const forms = [
  //     {
  //       id: 1,
  //       name: "Form 1",
  //     },
  //     {
  //       id: 2,
  //       name: "Form 2",
  //     },
  //     {
  //       id: 3,
  //       name: "Form 2",
  //     },
  //   ];
  const [forms, setforms] = useState([]);
  //   const [selectedForm, setselectedForm] = useState();
  const fetchForms = async () => {
    try {
      const res = await getAllForm();
      // console.log(res.data);
      const result = await res.json();
      if (result?.data.length !== 0) {
        // setSelectedForm(result?.data[0]);
        // navigate(`/dashboard/form/${result?.data[0]?._id}`);
      }
      setforms([...result?.data]);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const submitData = async (data) => {
    const payload = {
      ...data,
      userId: user._id,
    };
    const encPayload = { encData: encryptMessage(payload) };

    console.log(payload, encPayload);
    const res = await CreateForm(encPayload);
    const result = await res.json();
    if (result?.success) {
      toast.success("Form created successfully");
      fetchForms();
      setaddNewModal(false);
    }
    console.log(result);
  };

  const SelectForm = (form) => {
    navigate(`/dashboard/form/${form?._id}`);
    // setSelectedForm(form); // set in global
  };
  useEffect(() => {
    fetchForms();
  }, [selectedForm]);
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
      <div className="md:hidden bg-slate-100 rounded-md mb-3 h-[300px]">
        Charts
      </div>
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
              key={form.formId}
              onClick={() => {
                SelectForm(form);
              }}
              className={` ${
                selectedForm?.formId === form.formId && "bg-slate-100"
              } font-medium cursor-pointer p-1 m-0 border hover:bg-slate-100 rounded-md`}
            >
              {form?.formName}
            </p>
          ))}
          {forms?.length === 0 && (
            <div className=" text-gray-400">No forms available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Forms;
