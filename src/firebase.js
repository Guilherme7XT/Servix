// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvnW3_0Qaw_j4lj1F7PH8RPqfgLvp1AN0",
  authDomain: "servix-c054b.firebaseapp.com",
  projectId: "servix-c054b",
  storageBucket: "servix-c054b.firebasestorage.app",
  messagingSenderId: "884404076710",
  appId: "1:884404076710:web:b288aa58bbd54698eb7467",
  measurementId: "G-8Q5F15KZX5"
};

//Iniciaizar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };