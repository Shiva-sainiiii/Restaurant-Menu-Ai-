// auth/signup.js
// 📝 Signup logic for City Café (Firebase Auth)

import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

/* =========================
   DOM ELEMENTS
========================= */
const signupForm = document.getElementById("signupForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

/* =========================
   SIGNUP HANDLER
========================= */
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  if (!name || !email || !password || !confirmPassword) {
    alert("Please fill all fields");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    // Create user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Save display name
    await updateProfile(userCredential.user, {
      displayName: name
    });

    console.log("✅ Signup successful");

    // Redirect to login
    window.location.replace("/pages/login.html");
  } catch (error) {
    alert(error.message);
  }
});
