// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeqWVBIdqKSaaehcbxjf6ybfLp0TCN7mY",
  authDomain: "house-marketplace-app-5097b.firebaseapp.com",
  projectId: "house-marketplace-app-5097b",
  storageBucket: "house-marketplace-app-5097b.appspot.com",
  messagingSenderId: "84964790934",
  appId: "1:84964790934:web:58824a8994660947ea68b7"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

export const db = getFirestore()