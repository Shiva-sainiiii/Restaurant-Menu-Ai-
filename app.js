/* =========================
   City Café - Main App Entry
   app.js
========================= */

// UI logic
import {
  initNavigation,
  renderMenu,
  renderFavorites
} from "./js/ui.js";

// PWA logic (safe even if ignored)
import { initPWA } from "./js/pwa.js";

/* =========================
   APP INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 City Café App Initializing...");

  try {
    // Bottom navigation (Home / AI / Fav / Profile)
    initNavigation();

    // Initial renders
    renderMenu();
    renderFavorites();

    // PWA setup (optional)
    initPWA();

    console.log("✅ City Café Ready");
  } catch (error) {
    console.error("❌ App Init Error:", error);
  }
});

/* =========================
   GLOBAL ERROR HANDLING
========================= */
window.addEventListener("error", (e) => {
  console.error("❌ Global Error:", e.message);
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("❌ Promise Rejection:", e.reason);
});
