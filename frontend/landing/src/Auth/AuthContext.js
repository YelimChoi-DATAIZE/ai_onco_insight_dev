import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 6시간 후 만료 시간 (ms 단위) backend jwt token 만료시간과 동일하게
  const sessionDuration = 1000 * 60 * 60 * 6;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const expireAt = localStorage.getItem("expireAt");

    if (token && expireAt) {
      const now = Date.now();
      if (now < Number(expireAt)) {
        setIsLoggedIn(true);
      } else {
        handleLogout();
      }
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("expireAt", Date.now() + sessionDuration);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expireAt");
    localStorage.removeItem("googleUserInfo");
    localStorage.removeItem("@tosspayments/merchant-browser-id");
    localStorage.removeItem("keywordOverlayViewed");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
