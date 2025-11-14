"use client";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  auth: null,
  setAuth: (auth: any) => auth,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
