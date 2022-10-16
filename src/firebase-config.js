// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUREO5bf1-nFip0envCb5pxKiYezj-scY",
  authDomain: "blog-44cd8.firebaseapp.com",
  projectId: "blog-44cd8",
  storageBucket: "blog-44cd8.appspot.com",
  messagingSenderId: "631172791102",
  appId: "1:631172791102:web:7aad8bd784f293e739ca6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

