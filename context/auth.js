import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import Cookies from "js-cookie";
import api, { setAuthToken, clearAuthToken } from "@/api/_axios";
import ENDPOINTS from "@/api/endpoints";
import { Loader2 } from "lucide-react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const initialize = async () => {
    setLoading(true);
    const token = Cookies.get("authToken");

    if (token) {
      setAuthToken(token);
      try {
        const res = await api.get(ENDPOINTS.USERS.GET_ME);

        setUser(res.data);
        router.replace("/");
      } catch {
        setUser(null);
        Cookies.remove("authToken");
        router.replace("/auth/login");
      }
    } else {
      setUser(null);
      clearAuthToken();
      router.replace("/auth/login");
    }
    setLoading(false);
  };

  const login = async ({ email, password }) => {
    const res = await api.post(ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    });
    const token = res?.headers["authorization"] || res.data.token;

    if (token) {
      Cookies.set("authToken", token);
      setAuthToken(token);
      const userRes = await api.get(ENDPOINTS.USERS.GET_ME);

      setUser(userRes.data);
      router.replace("/");
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("authToken");
    clearAuthToken();
    router.replace("/auth/login");
  };

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <div className="animate-pulse">
          <Loader2 className="animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
