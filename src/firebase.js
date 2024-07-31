// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, addDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8_QYoMko79NDdlf7trUyWg0GHFvHloXQ",
  authDomain: "edutech4space-423b9.firebaseapp.com",
  projectId: "edutech4space-423b9",
  storageBucket: "edutech4space-423b9.appspot.com",
  messagingSenderId: "277819124227",
  appId: "1:277819124227:web:04a4b395c2cd47803f7c36",
  measurementId: "G-JMDPM15JDD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  return signInWithPopup(auth, googleProvider);
};

export { auth, signInWithEmailAndPassword, signInWithGoogle, db, collection, query, where, getDocs, addDoc, updateDoc };



