// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth/web-extension";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBM8nCDr4tGcUwqlsaQkZxsy6leMSWXsa4",
  authDomain: "pingmottu.firebaseapp.com",
  projectId: "pingmottu",
  storageBucket: "pingmottu.firebasestorage.app",
  messagingSenderId: "1048965757057",
  appId: "1:1048965757057:web:d4f60aa0f073a17f1a7580",
  measurementId: "G-W50CDW37LL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };