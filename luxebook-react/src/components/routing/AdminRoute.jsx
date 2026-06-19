import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function AdminRoute({ children }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ redirectTo: location.pathname }} replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/customer-portfolio" replace />;
  }

  return children;
}
