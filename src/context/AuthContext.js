import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  linkWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; // Import Firestore

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  const auth = getAuth();
  const db = getFirestore(); // Initialize Firestore

  // Listen to auth state changes and update currentUser accordingly
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setCurrentUser);
    return unsubscribe; // Cleanup on component unmount
  }, [auth]);

  // Google Login Function
  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user already exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        console.log("User does not exist in Firestore, saving new user...");

        // Save user details to Firestore if not already saved
        await setDoc(userRef, {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          providerId: user.providerId,
          createdAt: new Date(),
        });

        console.log("User saved to Firestore");
      } else {
        console.log("User already exists in Firestore");
      }

      // Set current user state
      setCurrentUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        providerId: user.providerId,
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Login failed:", err.message);
    }
  };

  // Email/Password Signup
  const signupWithEmailPassword = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // Update displayName and other user details after email/password signup
      await updateProfile(user, {
        displayName,
      });

      setCurrentUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        providerId: user.providerId,
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Signup failed:", err.message);
    }
  };

  // Email/Password Login
  const loginWithEmailPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      setCurrentUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        providerId: user.providerId,
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Login failed:", err.message);
    }
  };

  // Logout Function
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  // Link Google Account to Email/Password
  const linkGoogleToEmailPassword = async (email, password) => {
    const user = auth.currentUser;
    if (!user) {
      console.error("No user signed in");
      return;
    }

    const credential = EmailAuthProvider.credential(email, password);

    try {
      await linkWithCredential(user, credential);
      console.log("Google account linked with email/password");
    } catch (err) {
      console.error("Error linking Google account:", err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login, // Add login function here
        signupWithEmailPassword,
        loginWithEmailPassword,
        logout,
        linkGoogleToEmailPassword, // Add the new method to link accounts
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
