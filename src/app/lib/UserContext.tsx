/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; 

type UserContextType = {
  user: boolean | undefined;
  userName: string | null;
  token: string | null;
  setUserFunction: (prop: boolean | undefined) => void;
  setUserName: (name: string | null) => void;
  setTokenFunction: (token: string | null) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<boolean | undefined>(undefined);
  const [userName, setUserNameState] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me", { method: "GET" });
        if (!response.ok) throw new Error("Not authenticated");

        const data = await response.json();
        setToken(data.token);
        setUser(true);
      } catch {
        setUser(false);
        setToken(null);
      }
    };

    fetchUser();
  }, []);

  const setUserFunction = (props: boolean | undefined) => {
    setUser(props);
  };

  const setUserName = (name: string | null) => {
    if (name) {
      localStorage.setItem("userName", name);
    } else {
      localStorage.removeItem("userName");
    }
    setUserNameState(name)
  };

  const setTokenFunction = async (token: string | null) => {
    console.log("this is the token I have", token)
    if (token) {
      await fetch("/api/auth/set-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      setUser(true);
    } else {
      await fetch("/api/auth/logout", { method: "GET" });
      setUser(false);
    }
    setToken(token);
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "GET" });
    setToken(null);
    setUser(false);
    router.push("/login");
  };


  return (
    <UserContext.Provider value={{ user, userName,  token, setUserFunction, setUserName, setTokenFunction, logout }}>
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
