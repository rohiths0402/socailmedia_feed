import React, { createContext, useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch
import { setUser } from "../Slice/userSlice"; // Import the setUser action from your userSlice
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
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch(); // Initialize dispatch

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const displayName = user.displayName || user.email; // Fallback to email if displayName is null

        // Update Redux store with the user info using userSlice
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName, // Use the fallback displayName
            photoURL: user.photoURL,
            providerId: user.providerId,
          }),
        );

        setCurrentUser({
          uid: user.uid,
          email: user.email,
          displayName, // Use fallback displayName
          photoURL: user.photoURL,
          providerId: user.providerId,
        });
      } else {
        // Clear the user from both state and Redux if logged out
        dispatch(setUser(null));
        setCurrentUser(null);
      }
    });

    return unsubscribe;
  }, [auth, dispatch]); // Make sure dispatch is in the dependency array

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user has a displayName
      const displayName = user.displayName || user.email; // Fallback to email if displayName is null

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        console.log("User does not exist in Firestore, saving new user...");

        // Save user details to Firestore if not already saved
        await setDoc(userRef, {
          email: user.email,
          displayName, // Use displayName from Google or fallback to email
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
        displayName, // Use the fallback displayName
        photoURL: user.photoURL,
        providerId: user.providerId,
      });

      // Dispatch user to Redux using userSlice
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName,
          photoURL: user.photoURL,
          providerId: user.providerId,
        }),
      );

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

      // Dispatch user to Redux using userSlice
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          providerId: user.providerId,
        }),
      );

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

      // Dispatch user to Redux using userSlice
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          providerId: user.providerId,
        }),
      );

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
      dispatch(setUser(null)); // Clear user from Redux when logged out
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
