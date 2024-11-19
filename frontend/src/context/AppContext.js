// src/context/AppContext.js
import React, { createContext, useContext, useState } from "react";

// 1. Create the context
const AppContext = createContext();

// 2. Create a provider component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [forms, setforms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        forms,
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
