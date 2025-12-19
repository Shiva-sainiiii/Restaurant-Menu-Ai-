// auth/firebase.js
// 🔥 Firebase single source of truth for City Café

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

/* =========================
   FIREBASE CONFIG
========================= */
const firebaseConfig = {
  apiKey: "AIzaSyDmF5re93Zm2IhmydnVQ1fRqqQcoL38_PM",
  authDomain: "citycafe-4fc73.firebaseapp.com",
  projectId: "citycafe-4fc73",
  storageBucket: "citycafe-4fc73.firebasestorage.app",
  messagingSenderId: "1001867744684",
  appId: "1:1001867744684:web:4ae946ff8b0b5928ce5609"
};

/* =========================
   INIT FIREBASE
========================= */
const app = initializeApp(firebaseConfig);

/* =========================
   AUTH INSTANCE
========================= */
export const auth = getAuth(app);

/* =========================
   AUTH STATE HELPER
========================= */
/**
 * Listen to auth state changes
 * @param {Function} callback
 */
export function listenAuthState(callback) {
  onAuthStateChanged(auth, user => {
    callback(user);
  });
  }
