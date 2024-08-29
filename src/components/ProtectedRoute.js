import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const sessionId = sessionStorage.getItem("sessionId");

  if (!sessionId) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
