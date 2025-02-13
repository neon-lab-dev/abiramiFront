import React, { useContext, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
    const { admin, loading } = useContext(AuthContext);
  

  useEffect(() => {
    if (!admin ) {
      alert("Please login to continue.");
    }
  }, [admin]);

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;