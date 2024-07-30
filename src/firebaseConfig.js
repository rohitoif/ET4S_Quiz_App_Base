// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8_QYoMko79NDdlf7trUyWg0GHFvHloXQ",
  authDomain: "edutech4space-423b9.firebaseapp.com",
  projectId: "edutech4space-423b9",
  storageBucket: "edutech4space-423b9.appspot.com",
  messagingSenderId: "277819124227",
  appId: "1:277819124227:web:04a4b395c2cd47803f7c36",
  measurementId: "G-JMDPM15JDD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db }; 