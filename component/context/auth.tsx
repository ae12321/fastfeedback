"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { firebaseAuth } from "../../lib/firebase";
import { GithubAuthProvider, User, signInWithPopup, signOut } from "firebase/auth";
import { createUser } from "@/lib/database";

type AuthContext = {
  user: User | null;
  signinWithGitHub: () => void;
  signoutWithGitHub: () => void;
};

const AuthContext = createContext<AuthContext>({} as AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

function useProvideAuth(): AuthContext {
  const [user, setUser] = useState<User | null>(null);

  function signinWithGitHub() {
    const provider = new GithubAuthProvider();
    signInWithPopup(firebaseAuth, provider).then((result) => {
      const { user } = result;
      setUser(user);
      createUser(user.uid, user?.email || "nouser@example.com")
        .then((a) => {
          console.log("create" + a);
        })
        .catch((err) => {
          console.error(err);
        });
      return user;
    });
  }

  function signoutWithGitHub() {
    const provider = new GithubAuthProvider();
    signOut(firebaseAuth).then((result) => {
      setUser(null);
    });
  }

  useEffect(() => {
    const unsubscribe = () => {
      firebaseAuth.onAuthStateChanged((user) => setUser(user));
    };
    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGitHub,
    signoutWithGitHub,
  };
}
