import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("ft_token");
  if (!token) {
    // redirect to login if not logged in
    return <Navigate to="/login" replace />;
  }
  return children; // render the protected component
}
