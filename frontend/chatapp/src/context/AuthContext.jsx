import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // check auth on app load
  const checkAuth = async () => {
    try {
      const res = await api.get("/user/getMe");

      setUser(res.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  //signin function
  const login = async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);

      setUser(response.data.user);

      return response.data.user;
    } catch (error) {
      throw error.response?.data || "Login failed";
    }
  };

  //signup function
  const registerUser = async (credentials) => {
    try {
      const response = await api.post("/auth/register", credentials);
      setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      throw error.response?.data || { message: "Register failed" };
    }
  };

  //signout function
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        logout,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
