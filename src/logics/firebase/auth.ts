import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from ".";
import { Auth } from "../auth";

export const login = async () => {
  signInWithRedirect(getAuth(app), new GoogleAuthProvider());
};

export const useFirebaseAuth = () => {
  const [auth, setAuth] = useState({ isLoading: true } as Auth);

  useEffect(() => {
    const fetchAuth = async () => {
      onAuthStateChanged(getAuth(app), (user) => {
        if (
          !user ||
          user.isAnonymous ||
          !user.displayName ||
          !user.photoURL ||
          !user.emailVerified
        ) {
          setAuth({ isLoading: false } as Auth);
          return;
        }
        setAuth({
          displayName: user.displayName,
          photoUrl: user.photoURL,
          uid: user.uid,
          isLoading: false,
        });
      });
    };
    fetchAuth();
  }, []);

  return auth;
};
