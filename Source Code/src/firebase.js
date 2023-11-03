/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASJXbAeEUrc_mKHt8fmQN4e_67k7HWJpQ",
  authDomain: "nft-gallery-8c5a8.firebaseapp.com",
  projectId: "nft-gallery-8c5a8",
  storageBucket: "nft-gallery-8c5a8.appspot.com",
  messagingSenderId: "788102417483",
  appId: "1:788102417483:web:1a4172f4b127b232db11ce",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
