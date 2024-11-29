// src/context/AppContext.js
import React, { createContext, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleForm, getUserData } from "../Service/Api";
import toast from "react-hot-toast";

// 1. Create the context
const AppContext = createContext();

// 2. Create a provider component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [forms, setforms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const navigate = useNavigate();
  const fetchSIngleForm = async (formid) => {
    // const formid = id;
    const payload = { id: formid };
    const res = await getSingleForm(payload);
    const result = await res.json();
    // console.log(result);
    if (res?.status === 404 || res?.status === 400) {
      toast.error("Form not found");
      navigate("/dashboard");
    }
    setSelectedForm(result.data);
  };

  const fetchUserData = async () => {
    try {
      const res = await getUserData();
      const result = await res.json();
      console.log(result);
      setUser(result.data);
    } catch (error) {
      toast.error(error?.message || error);
    }
  };
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        forms,
        fetchSIngleForm,
        fetchUserData,
        setforms,
        selectedForm,
        setSelectedForm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 3. Create a custom hook for easier usage
export const useAppContext = () => {
  return useContext(AppContext);
};
