"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type UserContextType = {
  user: boolean | undefined;
  setUserFunction: (prop: boolean | undefined) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<boolean | undefined>(undefined);

  const setUserFunction = (props: boolean |  undefined) => {
    setUser(props);
  };

  return (
    <UserContext.Provider value={{ user, setUserFunction }}>
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
