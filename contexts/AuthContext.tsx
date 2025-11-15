"use client";

import { getAuthUser } from "@/actions"; // your API call
import { IUser } from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);

  // Function to fetch user from API
  const refreshUser = async () => {
    try {
      const data = await getAuthUser();
      setUser(data || null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      setUser(null);
    }
  };

  // Fetch user once on mount
  useEffect(() => {
    const fetchUser = async () => {
      await refreshUser();
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
