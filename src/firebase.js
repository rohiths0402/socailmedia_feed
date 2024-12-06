// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDIFyjULWU712wChUuvacRhgbxsKmE5GY8",
    authDomain: "socialmedia-feed-d4ee2.firebaseapp.com",
    projectId: "socialmedia-feed-d4ee2",
    storageBucket: "socialmedia-feed-d4ee2.firebasestorage.app",
    messagingSenderId: "227430365948",
    appId: "1:227430365948:web:45ddda6843e524c9e53579",
    measurementId: "G-B7VCD1J06F"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, db, storage };
