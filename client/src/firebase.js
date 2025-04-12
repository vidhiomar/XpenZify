// import { fileURLToPath } from 'url';
import path from 'path';
// import dotenv from 'dotenv';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({ path: path.resolve(__dirname, '../.env') });

const firebaseConfig = {
  apiKey: 'AIzaSyC-_Fmc__teuQThfHsq8uFvurKICAzzyts',
  authDomain: 'xpenzify.firebaseapp.com',
  projectId: 'xpenzify',
  storageBucket: 'xpenzify.firebasestorage.app',  
  messagingSenderId: '472560092413',
  appId:'1:472560092413:web:d4723ad60df9a0f4872a94',
  measurementId: 'G-GYC0VHEX18'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);