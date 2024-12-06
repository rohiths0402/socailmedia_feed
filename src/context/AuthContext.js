// src/context/AuthContext.js
import React, { createContext, useContext, useState } from "react";
import { signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setCurrentUser(userCredential.user);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.message); // Handle the error
      console.error("Login failed:", err.message);
    }
  };

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setCurrentUser(null);
      })
      .catch((err) => {
        console.error("Logout failed:", err.message);
      });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
