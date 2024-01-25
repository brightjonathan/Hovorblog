import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "hovorblog-99f5f.firebaseapp.com",
  projectId: "hovorblog-99f5f",
  storageBucket: "hovorblog-99f5f.appspot.com",
  messagingSenderId: "291928119191",
  appId: "1:291928119191:web:912e30763c7db30d21d6d2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);