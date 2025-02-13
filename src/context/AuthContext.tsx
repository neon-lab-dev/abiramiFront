import { createContext, useState, useEffect } from "react";
import { verifyAdminByToken } from "../api/api";
import Cookies from "js-cookie";
import { ReactNode } from "react";

export const AuthContext = createContext({
  admin: localStorage.getItem("admin") || null,
  loading: true,
});


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState(localStorage.getItem("admin") || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin") || 'null');
    if (admin) {
      setAdmin(admin);
    } else {
      setAdmin(null);
    }
  }, [])

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("token");
        if (!token) {
          localStorage.removeItem("admin");
          return;
        }

        const { data } = await verifyAdminByToken(token);
        setAdmin(data);

        // localStorage.setItem("admin", JSON.stringify(data));
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
    <AuthContext.Provider value={{ admin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
