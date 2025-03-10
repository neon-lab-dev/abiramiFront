import { createContext, useState, useEffect } from "react";
import { verifyAdminByToken } from "../api/api";
import Cookies from "js-cookie";
import { ReactNode } from "react";


export const AuthContext = createContext({
  admin: localStorage.getItem("admin") || null,
  loading: true,
  setAdmin: (admin: any) => {}, // <-- Add this function
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState(localStorage.getItem("admin") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("token");
        if (!token) {
          localStorage.removeItem("admin");
          setAdmin(null);
          return;
        }

        const { data } = await verifyAdminByToken(token);
        setAdmin(data);
      } catch (error) {
        console.error(error);
        Cookies.remove("token");
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ admin, loading, setAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

