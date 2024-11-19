import React, { createContext, useContext, useState } from 'react';


const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(() =>
    {
        return localStorage.getItem("isAuthenticated") === "true";
    });
  

  const login = () => {
    setAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };
  const logout = () => {
    setAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
