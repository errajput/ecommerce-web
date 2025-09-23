"use client";

import { createContext, useEffect, useState } from "react";

import { isUserLogin } from "@/services/http.service";
import { getUserProfile } from "@/services/user.service";

export const UserContext = createContext({ isLogin: false, isSeller: false });

const Providers = ({ children }) => {
  const [user, setUser] = useState({ isLogin: false, isSeller: false });

  useEffect(() => {
    const isLogin = isUserLogin();

    if (isLogin) {
      getUserProfile()
        .then((profile) => {
          setUser({ isLogin: true, isSeller: profile.isSeller });
        })
        .catch((err) => {
          console.error("Error fetching profile in Provider:", err.message);
          setUser({ isLogin: false, isSeller: false });
        });
    }
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
