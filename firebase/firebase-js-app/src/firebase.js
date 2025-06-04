// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Your web app's Firebase configuration
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

// Initialize Firestore & Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();