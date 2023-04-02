// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCr4XzxM_FDh6Z_rAGobvphXOuGGCYcmDA",
  authDomain: "patientmonitorinterface.firebaseapp.com",
  databaseURL: "https://patientmonitorinterface-default-rtdb.firebaseio.com",
  projectId: "patientmonitorinterface",
  storageBucket: "patientmonitorinterface.appspot.com",
  messagingSenderId: "265441208090",
  appId: "1:265441208090:web:fb1e0c78578da7f7052ea3",
  measurementId: "G-K900XK48L4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database =  getDatabase(app);