// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDojSOUPxKBvSLL5BwBPgt4hRcmq4M_Y1c",
  authDomain: "pocketplan-e136a.firebaseapp.com",
  projectId: "pocketplan-e136a",
  storageBucket: "pocketplan-e136a.firebasestorage.app",
  messagingSenderId: "105627419690",
  appId: "1:105627419690:web:93c93e1fbf5a85ca56af53",
  measurementId: "G-R10PKY9RT7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { db, auth, provider, doc, setDoc, storage };
