import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";  


const firebaseConfig = {
  apiKey: "AIzaSyABJTX7BSuIPzbU22NuWAQZsBzJ0LtEbCU",
  authDomain: "to-do-app-3881a.firebaseapp.com",
  projectId: "to-do-app-3881a",
  storageBucket: "to-do-app-3881a.firebasestorage.app",
  messagingSenderId: "570540035686",
  appId: "1:570540035686:web:ab5a800d402ba9c1c367a7",
  measurementId: "G-QM9ZLKEDVB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;