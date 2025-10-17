import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyBvnW3_0Qaw_j4lj1F7PH8RPqfgLvp1AN0",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "servix-c054b.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "servix-c054b",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "servix-c054b.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "884404076710",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:884404076710:web:b288aa58bbd54698eb7467"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
