// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";  // <-- Import getAuth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCroecK8YNkOg_I9rbORCmwXtbY9ngikBA",
  authDomain: "foot-ai.firebaseapp.com",
  projectId: "foot-ai",
  storageBucket: "foot-ai.firebasestorage.app",
  messagingSenderId: "1023674533477",
  appId: "1:1023674533477:web:3c7df942554aaa674b288c",
  measurementId: "G-LVEH9QENN1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const auth = getAuth(app);  // <-- Initialise auth

export { auth, analytics };  // <-- Export auth et analytics
