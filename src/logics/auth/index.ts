import { createContext, useContext } from "react";

export type Auth = {
  displayName: string;
  photoUrl: string;
  uid: string;
  isLoading: boolean;
};

export const AuthContext = createContext<Auth>({} as Auth);

export const useAuth = () => {
  return useContext(AuthContext);
};
