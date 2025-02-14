import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "hovorblog-fa0c7.firebaseapp.com",
  projectId: "hovorblog-fa0c7",
  storageBucket: "hovorblog-fa0c7.appspot.com",
  messagingSenderId: "20964592958",
  appId: "1:20964592958:web:5655b90f54c80c5ca8f06f",
  measurementId: "G-FM2HLQMQ7C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);



