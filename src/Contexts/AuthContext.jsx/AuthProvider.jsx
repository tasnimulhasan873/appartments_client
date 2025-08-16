import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  const signUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (profile) => {
    // profile: { displayName: "name", photoURL: "url" }
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, profile);
    } else {
      return Promise.reject("No user currently logged in");
    }
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("User in the current Auth state Changed", currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const AuthInfo = {
    user,
    loading,
    createUser,
    signUser,
    logOut,
    signInWithGoogle,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={AuthInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
