import { createContext, useEffect, useState } from "react";
import axios from "@/lib/axios";
import { toast } from "@/hooks/useToast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/getUser");
        setUser(res.data.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      setUser(res.data.data.user);
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
      return false;
    }
  };

  const register = async ({ name, email, password }) => {
    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      setUser(res.data.data.user);
      return true;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      return false;
    }
  };

  const logout = async () => {
    await axios.post("/api/auth/logout");
    toast.success("You have successfully logged out.");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
