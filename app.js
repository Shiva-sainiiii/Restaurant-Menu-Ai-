/* =========================
   MAIN APP ENTRY POINT
   app.js
========================= */

// UI logic
import {
  initNavigation,
  renderMenu,
  renderFavorites
} from "./js/ui.js";

// PWA logic
import { initPWA } from "./js/pwa.js";

/* =========================
   APP INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 City Café App Starting...");

  // Init navigation (bottom nav)
  initNavigation();

  // Initial renders
  renderMenu();
  renderFavorites();

  // Init PWA (service worker + install)
  initPWA();

  console.log("✅ App Ready");
});

/* =========================
  GLOBAL ERROR SAFETY
========================= */
window.addEventListener("error", e => {
  console.error("❌ Global Error:", e.message);
});

window.addEventListener("unhandledrejection", e => {
  console.error("❌ Promise Rejection:", e.reason);
});;