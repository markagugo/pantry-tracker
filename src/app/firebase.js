// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9p__Lys5yRCR6V61HCI8_ipjOnOVH4hw",
  authDomain: "pantry-tracker-c21f3.firebaseapp.com",
  projectId: "pantry-tracker-c21f3",
  storageBucket: "pantry-tracker-c21f3.appspot.com",
  messagingSenderId: "58401081961",
  appId: "1:58401081961:web:57b5104eb45c8e224230f8",
  measurementId: "G-1H1KBX57ZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth();

export { auth, db };