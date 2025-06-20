'use client'

import { createContext, ReactNode, useContext, useState } from "react";
import { UserContextType } from "../types/userContextType";
import { AuthUser } from "../model/user";
import { useRouter } from "next/navigation";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const router = useRouter();

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loginSuccess");
    localStorage.setItem('logoutSuccess', 'true');
    router.push('/');
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};