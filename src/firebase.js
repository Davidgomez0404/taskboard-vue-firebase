import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyDkyEXCO-Yrl_ikFPuHReUvPjMw8EKvTck",
  authDomain: "taskboard-david.firebaseapp.com",
  projectId: "taskboard-david",
  storageBucket: "taskboard-david.firebasestorage.app",
  messagingSenderId: "50048732139",
  appId: "1:50048732139:web:ce19bbf03cf5650b8fe7ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Exportar Auth y Firestore
export const auth = getAuth(app)
export const db = getFirestore(app)
