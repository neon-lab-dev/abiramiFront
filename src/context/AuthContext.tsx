import { createContext, useState, useEffect } from "react";
import { verifyAdminByToken } from "../api/api";
import Cookies from "js-cookie";

export const AuthContext = createContext({
  admin: localStorage.getItem("admin") || null,
  loading: true,
});

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(localStorage.getItem("admin") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          localStorage.removeItem("admin");
          return;
        } // If no token, skip API call

        const { data } = await verifyAdminByToken(token);
        setAdmin(data);

        // Store the admin data in localStorage for future use
        // localStorage.setItem("admin", JSON.stringify(data));
      } catch (error) {
        console.error("Authentication error:", error);
        Cookies.remove("token");
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []); // Run once when the component mounts

  return (
    <AuthContext.Provider value={{ admin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
