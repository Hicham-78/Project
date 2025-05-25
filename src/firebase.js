// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYe8RwhNVroi5X6BsOtp6yh-ZoksX2ciU",
  authDomain: "it-quality-df21e.firebaseapp.com",
  projectId: "it-quality-df21e",
  storageBucket: "it-quality-df21e.firebasestorage.app",
  messagingSenderId: "148152355536",
  appId: "1:148152355536:web:713c77d7c3243c6fcaacd5",
  measurementId: "G-70CH8J6G66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);