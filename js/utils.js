/* =========================
   DOM HELPERS
========================= */

// Single selector
export const $ = (selector, scope = document) =>
  scope.querySelector(selector);

// Multiple selector
export const $$ = (selector, scope = document) =>
  [...scope.querySelectorAll(selector)];

/* =========================
   LOCAL STORAGE HELPERS
========================= */

export const storage = {
  get(key, fallback = []) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.error("Storage GET error:", e);
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Storage SET error:", e);
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  }
};

/* =========================
   DEBOUNCE (PERFORMANCE)
========================= */

export function debounce(fn, delay = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

/* =========================
   FORMATTERS
========================= */

export function formatRating(rating) {
  return `⭐ ${rating}`;
}

export function formatTime(time) {
  return `⏱ ${time}`;
}

/* =========================
   SAFE ELEMENT CREATOR
========================= */

export function createEl(tag, className, html) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (html) el.innerHTML = html;
  return el;
}

/* =========================
   ID GENERATOR (OPTIONAL)
========================= */

export function uid(prefix = "id") {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}