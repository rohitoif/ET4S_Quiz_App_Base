// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBGwPGAoYPT4NnBWaswY43tmp1dyHvMltM",
  authDomain: "edutech4space-d0bbd.firebaseapp.com",
  projectId: "edutech4space-d0bbd",
  storageBucket: "edutech4space-d0bbd",
  messagingSenderId: "961358362257",
  appId: "1:961358362257:web:0f5ccbebcddc0321887130",
  measurementId: "G-YS3DRTCHC7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithGoogle };
