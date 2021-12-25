import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from ".";

export const login = () => {
  signInWithRedirect(getAuth(app), new GoogleAuthProvider());
};

export const useAuth = () => {
  const [displayName, setDisplayName] = useState<string | undefined>();
  const [photoUrl, setPhotoUrl] = useState<string | undefined>();

  useEffect(() => {
    getRedirectResult(getAuth(app))
      .then((result) => {
        if (result) {
          const user = result?.user;

          // uid
          // email
          // emailVerified

          if (
            user.isAnonymous ||
            !user.displayName ||
            !user.photoURL ||
            !user.emailVerified
          ) {
            return;
          }

          setDisplayName(user.displayName);
          setPhotoUrl(user.photoURL);

          console.log("OK", user);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("ERR", errorCode, errorMessage);
      });
  }, []);

  return [displayName, photoUrl];
};
