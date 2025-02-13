import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { admin } = useContext(AuthContext);
  useEffect(() => {
    if (!admin) {
      <Navigate to="/login" replace />
    }
  }, [admin]);

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;