// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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