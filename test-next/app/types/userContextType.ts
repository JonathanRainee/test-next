import { UserResponse } from "../response/userResponse";

export interface UserContextType{
  user: UserResponse | null;
  setUser: (user: UserResponse | null) => void;
  logoutUser: () => void;
}

