import React from "react";
import { useAppContext } from "../context/AppContext";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, showAlert } = useAppContext();
  let location = useLocation();

  if (user.userData.isAdmin) {
    return children;
  } else if (!user) {
    showAlert("Please Login First", true);
    return (
      <Navigate
        to='/login'
        state={{ from: location }}
        replace
      />
    );
  } else {
    showAlert("Only Admin Can Access!!", true);
    return (
      <Navigate
        to='/'
        state={{ from: location }}
        replace
      />
    );
  }
}
