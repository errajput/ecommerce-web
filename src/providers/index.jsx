"use client";

import { createContext, useEffect, useState } from "react";

import { isUserLogin } from "@/services/http.service";

export const UserContext = createContext({ isLogin: false });

const Providers = ({ children }) => {
  const [user, setUser] = useState({ isLogin: false });
  // TODO: Find why error when not using typeof window !== "undefined"
  // console.log("Outside", typeof window !== "undefined" ? window : "Not Found");

  useEffect(() => {
    // console.log("Inside", window);
    const isLogin = isUserLogin();
    setUser({ isLogin });
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

export default Providers;
