// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// Required for side-effects
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKTDJ7BIGKaeuRqrSJrBvI6djmvKiDgoY",
  authDomain: "khabar-f00f8.firebaseapp.com",
  projectId: "khabar-f00f8",
  storageBucket: "khabar-f00f8.appspot.com",
  messagingSenderId: "852516938507",
  appId: "1:852516938507:web:e061a19fabd3f55b1f380e",
  measurementId: "G-SGDVF6C11H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();

export { analytics, db };
