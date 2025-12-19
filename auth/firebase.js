// auth/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDmF5re93Zm2IhmydnVQ1fRqqQcoL38_PM",
  authDomain: "citycafe-4fc73.firebaseapp.com",
  projectId: "citycafe-4fc73",
  storageBucket: "citycafe-4fc73.firebasestorage.app",
  messagingSenderId: "1001867744684",
  appId: "1:1001867744684:web:4ae946ff8b0b5928ce5609"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth
export const auth = getAuth(app);