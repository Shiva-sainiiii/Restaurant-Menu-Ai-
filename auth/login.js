// auth/login.js
import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

// Elements
const form = document.getElementById("loginForm");
const googleBtn = document.getElementById("googleLogin");

/* =========================
   EMAIL + PASSWORD LOGIN
========================= */
form.addEventListener("submit", e => {
  e.preventDefault();

  const email = form.email.value.trim();
  const password = form.password.value.trim();

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "/index.html";
    })
    .catch(err => {
      alert(err.message);
    });
});

/* =========================
   GOOGLE LOGIN
========================= */
const provider = new GoogleAuthProvider();

googleBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(() => {
      window.location.href = "/index.html";
    })
    .catch(err => {
      alert(err.message);
    });
});