/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type UserContextType = {
  user: boolean | undefined;
  token: string | null;
  setUserFunction: (prop: boolean | undefined) => void;
  setTokenFunction: (token: string | null) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<boolean | undefined>(undefined);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Load token from localStorage on initial load
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      setUser(true); // Assume authenticated if token exists
    }
  }, []);

  const setUserFunction = (props: boolean | undefined) => {
    setUser(props);
  };

  const setTokenFunction = (token: string | null) => {
    if (token) {
      localStorage.setItem("authToken", token);
      setUser(true);
    } else {
      localStorage.removeItem("authToken");
      setUser(false);
    }
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(false);
  };

  return (
    <UserContext.Provider value={{ user, token, setUserFunction, setTokenFunction, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
