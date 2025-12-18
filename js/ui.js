/* =========================
   UI LOGIC
========================= */

import { $, $$, storage, debounce, createEl } from "./utils.js";

/* =========================
   DOM REFERENCES
========================= */
const pages = $$(".page");
const navButtons = $$(".nav-btn");
const menuEl = $("#menu");
const favList = $("#favList");
const searchInput = $("#searchInput");

/* =========================
   SAMPLE MENU DATA
   (Later replace with API)
========================= */
export const meals = [
  {
    id: 1,
    name: "Dhosa - Chatani",
    image: "assets/images/food1.jpg",
    rating: 4.5,
    time: "20 min"
  },
  {
    id: 2,
    name: "Momo",
    image: "assets/images/food2.jpg",
    rating: 4.2,
    time: "25 min"
  },
  {
    id: 3,
    name: "Sandwich",
    image: "assets/images/food3.jpg",
    rating: 4.7,
    time: "18 min"
  },
  {
    id: 4,
    name: "Pizza",
    image: "assets/images/food4.jpg",
    rating: 4.8,
    time: "30 min"
  },
  {
    id: 5,
    name: "Burger",
    image: "assets/images/food5.jpg",
    rating: 4.9,
    time: "35 min"
  },
  {
    id: 6,
    name: "Samosa",
    image: "assets/images/food6.jpg",
    rating: 4.4,
    time: "5 min"
  }
];

/* =========================
   NAVIGATION
========================= */
export function initNavigation() {
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      navButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const pageId = btn.dataset.page;
      pages.forEach(page => {
        page.classList.toggle("active", page.id === pageId);
      });
    });
  });
}

/* =========================
   MENU RENDER
========================= */
export function renderMenu(data = meals) {
  menuEl.innerHTML = "";

  data.forEach(meal => {
    const card = createEl(
      "div",
      "meal-card",
      `
      <img src="${meal.image}" alt="${meal.name}">
      <div class="meal-info">
        <h3 class="meal-name">${meal.name}</h3>
        <div class="meal-meta">
          <span>⭐ ${meal.rating}</span>
          <span>⏱ ${meal.time}</span>
        </div>
        <div class="meal-footer">
          <button>Add</button>
          <i class="fa-regular fa-heart fav-icon" data-id="${meal.id}"></i>
        </div>
      </div>
      `
    );

    menuEl.appendChild(card);
  });

  attachFavoriteEvents();
}

/* =========================
   FAVORITES
========================= */
function getFavorites() {
  return storage.get("favorites");
}

function toggleFavorite(id) {
  let favs = getFavorites();
  favs = favs.includes(id)
    ? favs.filter(f => f !== id)
    : [...favs, id];
  storage.set("favorites", favs);

  renderMenu();
  renderFavorites();
}

function attachFavoriteEvents() {
  $$(".fav-icon").forEach(icon => {
    const id = Number(icon.dataset.id);
    const favs = getFavorites();

    icon.classList.toggle("fa-solid", favs.includes(id));
    icon.classList.toggle("fa-regular", !favs.includes(id));

    icon.addEventListener("click", e => {
      e.stopPropagation();
      toggleFavorite(id);
    });
  });
}

export function renderFavorites() {
  favList.innerHTML = "";
  const favs = getFavorites();

  if (!favs.length) {
    favList.innerHTML = "<p>No favorites yet ❤️</p>";
    return;
  }

  meals
    .filter(meal => favs.includes(meal.id))
    .forEach(meal => {
      const card = createEl(
        "div",
        "meal-card",
        `
        <img src="${meal.image}">
        <div class="meal-info">
          <h3>${meal.name}</h3>
        </div>
        `
      );
      favList.appendChild(card);
    });
}

/* =========================
   SEARCH
========================= */
if (searchInput) {
  searchInput.addEventListener(
    "input",
    debounce(e => {
      const value = e.target.value.toLowerCase();
      const filtered = meals.filter(m =>
        m.name.toLowerCase().includes(value)
      );
      renderMenu(filtered);
    }, 200)
  );
}
