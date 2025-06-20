import { AuthUser } from "../model/user";

export interface UserContextType{
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
}

