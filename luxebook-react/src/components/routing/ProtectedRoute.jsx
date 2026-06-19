import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  console.log("[ProtectedRoute]", { isAuthenticated, pathname: location.pathname });

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ redirectTo: location.pathname }} replace />;
  }

  const isAdmin = user?.role === "admin" || user?.email === "admin@gmail.com";
  if (isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}
