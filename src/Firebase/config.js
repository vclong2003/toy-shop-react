// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoWeMrbMF6WoDCqlJTUO-ncQd0hYy11nY",
  authDomain: "project-1099786734477331845.firebaseapp.com",
  projectId: "project-1099786734477331845",
  storageBucket: "project-1099786734477331845.appspot.com",
  messagingSenderId: "456676056685",
  appId: "1:456676056685:web:f534ee300ef095e18a2964",
  measurementId: "G-EXY7P272BX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
