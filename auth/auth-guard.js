// auth/auth-guard.js
// 🔐 Firebase-based route protection for City Café

import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

/* =========================
   PROTECT MAIN APP (index.html)
========================= */
/**
 * Redirects to login page if user is NOT authenticated
 */
export function protectApp(redirectTo = "/pages/login.html") {
  onAuthStateChanged(auth, user => {
    if (!user) {
      console.warn("🚫 Not logged in, redirecting to login...");
      window.location.replace(redirectTo);
    }
  });
}

/* =========================
   PREVENT LOGIN / SIGNUP ACCESS
========================= */
/**
 * Prevent logged-in users from visiting login/signup pages
 */
export function preventAuthPages(redirectTo = "/index.html") {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log("✅ Already logged in, redirecting to app...");
      window.location.replace(redirectTo);
    }
  });
}

/* =========================
   LOGOUT
========================= */
export async function logout(redirectTo = "/pages/login.html") {
  await auth.signOut();
  window.location.replace(redirectTo);
}
