// firebas.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCroecK8YNkOg_I9rbORCmwXtbY9ngikBA",
  authDomain: "foot-ai.firebaseapp.com",
  projectId: "foot-ai",
  storageBucket: "foot-ai.appspot.com",  // Corrigé ici aussi
  messagingSenderId: "1023674533477",
  appId: "1:1023674533477:web:3c7df942554aaa674b288c",
  measurementId: "G-LVEH9QENN1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, analytics, db };
