// auth/login.js
// 🔐 Login logic for City Café (Firebase Auth)

import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

/* =========================
   DOM ELEMENTS
========================= */
const loginForm = document.getElementById("loginForm");
const googleBtn = document.getElementById("googleLogin");

/* =========================
   AUTH PERSISTENCE
========================= */
setPersistence(auth, browserLocalPersistence);

/* =========================
   EMAIL + PASSWORD LOGIN
========================= */
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginForm.email.value.trim();
  const password = loginForm.password.value.trim();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("✅ Login successful");
    window.location.replace("/index.html");
  } catch (error) {
    alert(error.message);
  }
});

/* =========================
   GOOGLE LOGIN
========================= */
const provider = new GoogleAuthProvider();

googleBtn.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
    console.log("✅ Google login successful");
    window.location.replace("/index.html");
  } catch (error) {
    alert(error.message);
  }
});
