// src/context/AppContext.js
import React, { createContext, useContext, useState } from "react";

// 1. Create the context
const AppContext = createContext();

// 2. Create a provider component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [forms, setforms] = useState([]);
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        forms,
        setforms,
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
