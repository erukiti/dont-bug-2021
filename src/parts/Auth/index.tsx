import { VFC } from "react";
import { AuthContext } from "~/logics/auth";
import { useFirebaseAuth } from "~/logics/firebase/auth";

export const AuthProvider: VFC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const auth = useFirebaseAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
