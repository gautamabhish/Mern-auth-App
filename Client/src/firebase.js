// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-abhi.firebaseapp.com",
  projectId: "mern-auth-abhi",
  storageBucket: "mern-auth-abhi.appspot.com",
  messagingSenderId: "826948680502",
  appId: "1:826948680502:web:4260ddce8dedf155719197"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
