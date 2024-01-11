import React, { createContext, useContext } from "react";

export const AppContext = createContext();

  // Custom Hook
  export const useAppContext = () => {
    return useContext(AppContext);
  };


