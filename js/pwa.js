/* =========================
   PWA LOGIC
========================= */

let deferredPrompt = null;

/* =========================
   INIT PWA
========================= */
export function initPWA() {
  registerServiceWorker();
  setupInstallPrompt();
}

/* =========================
   SERVICE WORKER
========================= */
function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(reg => {
        console.log("✅ Service Worker registered:", reg.scope);
      })
      .catch(err => {
        console.error("❌ Service Worker error:", err);
      });
  });
}

/* =========================
   INSTALL PROMPT
========================= */
function setupInstallPrompt() {
  const installBtn = document.getElementById("installBtn");
  if (!installBtn) return;

  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = "inline-block";
  });

  installBtn.addEventListener("click", async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    deferredPrompt = null;
    installBtn.style.display = "none";
  });
}