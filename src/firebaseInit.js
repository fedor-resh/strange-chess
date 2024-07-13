// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDKdUzUnHNOHSy1IFg00w4V7gesXKylsNU",
    authDomain: "sandbox-749cd.firebaseapp.com",
    databaseURL: "https://sandbox-749cd-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sandbox-749cd",
    storageBucket: "sandbox-749cd.appspot.com",
    messagingSenderId: "365400681534",
    appId: "1:365400681534:web:d7d317035c08a67f21b56f",
    measurementId: "G-K1LHY1KZC8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);