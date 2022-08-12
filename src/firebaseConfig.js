// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXywsVqXGnWdgwd57nXwAMHMDMoSlWOIw",
  authDomain: "zennotes-15461.firebaseapp.com",
  projectId: "zennotes-15461",
  storageBucket: "zennotes-15461.appspot.com",
  messagingSenderId: "832265760573",
  appId: "1:832265760573:web:3278c2772079ed46cf9f54",
  measurementId: "G-3XEKHXQ23B"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);
const analytics = getAnalytics(app);