import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const sessionId = sessionStorage.getItem("sessionId");
  const userRole = sessionStorage.getItem("userRole");

  if (!sessionId) {
    // If no session, redirect to sign-in page
    return <Navigate to="/signin" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // If user role does not match the required role, redirect to dashboard
    return <Navigate to="/dashboard" />;
  }

  // If the user is authorized, render the protected component
  return children;
};

export default ProtectedRoute;
