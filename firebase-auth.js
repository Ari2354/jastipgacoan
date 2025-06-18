import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyChQGQMAmLcP2TVhR4htgrkOV4YiPBNfbE",
    authDomain: "jastipgacoan-24d6f.firebaseapp.com",
    projectId: "jastipgacoan-24d6f",
    storageBucket: "jastipgacoan-24d6f.firebasestorage.app",
    messagingSenderId: "659394243514",
    appId: "1:659394243514:web:85192127ceb220eceacb83"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Register user function
export function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Login user function
export function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Logout user function
export function logoutUser() {
  return signOut(auth);
}

// Auth state listener
export function onAuthStateChange(callback) {
  return onAuthStateChanged(auth, callback);
}
