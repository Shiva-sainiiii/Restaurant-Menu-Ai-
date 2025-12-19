// auth-guard.js
// Protect pages: redirect to login if user is not authenticated

/**
 * Checks if the user is logged in.
 * Here we assume a simple token or flag in localStorage called 'user'.
 * Adjust according to your auth logic (Firebase, JWT, etc.)
 */
export function isAuthenticated() {
  const user = localStorage.getItem("user"); // Example: { name, email }
  return !!user;
}

/**
 * Protects a page by redirecting unauthorized users to login.
 * @param {string} redirectTo - URL to redirect if not logged in
 */
export function protectPage(redirectTo = "login.html") {
  if (!isAuthenticated()) {
    console.warn("🚫 Unauthorized access, redirecting to login...");
    window.location.href = redirectTo;
  }
}

/**
 * Optionally, prevent logged-in users from visiting login/signup
 * Useful for login.html or signup.html pages
 */
export function preventAuthPageAccess(redirectTo = "index.html") {
  if (isAuthenticated()) {
    console.log("✅ User already logged in, redirecting to home...");
    window.location.href = redirectTo;
  }
}

/**
 * Logout function
 * Clears localStorage/sessionStorage and redirects to login
 */
export function logout(redirectTo = "login.html") {
  localStorage.removeItem("user");
  window.location.href = redirectTo;
}