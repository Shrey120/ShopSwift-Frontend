import React from "react";
import { useAppContext } from "../context/AppContext";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, showAlert } = useAppContext();
  let location = useLocation();

  if (user) {
    return children;
  } else {
    showAlert("Please Login First", true);
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }
}
