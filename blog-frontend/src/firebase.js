// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import "firebase/firestore"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJdI0_oUcCnq-oWEuo7vM8P3jBFvHX9qY",
  authDomain: "react-siwon3.firebaseapp.com",
  projectId: "react-siwon3",
  storageBucket: "react-siwon3.appspot.com",
  messagingSenderId: "370751589925",
  appId: "1:370751589925:web:a8a05f32244b31ff5db9cc",
  measurementId: "G-KLMXF68Y2E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const firestore = app.firestore();
// const firestore = getFirestore(app)

export const db = getFirestore(app)