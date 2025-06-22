'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { UserContextType } from "../types/userContextType";
import { useRouter } from "next/navigation";
import { UserResponse } from "../response/userResponse";
import Cookies from 'js-cookie';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<UserResponse | null>(null)
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      try {
        const parsedUser = JSON.parse(userCookie);
        setUser(parsedUser);
      } catch (error) {
        console.error('Invalid user cookie:', error);
        Cookies.remove('user');
      }
    }
    setLoading(false);
  }, []);

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("loginSuccess");
    localStorage.setItem('logoutSuccess', 'true');
    router.push('/');
  };

  return (
    <UserContext.Provider value={{ user, setUser, logoutUser }}>
      {!loading && children}
    </UserContext.Provider>
  );
}

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};