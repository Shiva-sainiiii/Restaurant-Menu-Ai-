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
},
{
id: 7,
name: "Nachos",
image: "assets/images/food7.jpg",
rating: 4.3,
time: "15 min"
},
{
id: 8,
name: "Tacos",
image: "assets/images/food8.jpg",
rating: 4.6,
time: "20 min"
},
{
id: 9,
name: "Quesadilla",
image: "assets/images/food9.jpg",
rating: 4.1,
time: "25 min"
},
{
id: 10,
name: "Falafel",
image: "assets/images/food10.jpg",
rating: 4.4,
time: "30 min"
},
{
id: 11,
name: "Shawarma",
image: "assets/images/food11.jpg",
rating: 4.7,
time: "20 min"
},
{
id: 12,
name: "Spring Rolls",
image: "assets/images/food12.jpg",
rating: 4.2,
time: "18 min"
},
{
id: 13,
name: "Dumplings",
image: "assets/images/food13.jpg",
rating: 4.5,
time: "22 min"
},
{
id: 14,
name: "Hot Dog",
image: "assets/images/food14.jpg",
rating: 4.0,
time: "10 min"
},
{
id: 15,
name: "Grilled Cheese",
image: "assets/images/food15.jpg",
rating: 4.3,
time: "12 min"
},
{
id: 16,
name: "Chicken Nuggets",
image: "assets/images/food16.jpg",
rating: 4.6,
time: "15 min"
},
{
id: 17,
name: "Fish and Chips",
image: "assets/images/food17.jpg",
rating: 4.4,
time: "25 min"
},
{
id: 18,
name: "Chicken Tikka",
image: "assets/images/food18.jpg",
rating: 4.8,
time: "30 min"
},
{
id: 19,
name: "Meatball Sub",
image: "assets/images/food19.jpg",
rating: 4.5,
time: "20 min"
},
{
id: 20,
name: "Onion Rings",
image: "assets/images/food20.jpg",
rating: 4.1,
time: "18 min"
},
{
id: 21,
name: "Chicken Wings",
image: "assets/images/food21.jpg",
rating: 4.7,
time: "25 min"
},
{
id: 22,
name: "Paneer Tikka",
image: "assets/images/food22.jpg",
rating: 4.6,
time: "20 min"
},
{
id: 23,
name: "Veggie Burger",
image: "assets/images/food23.jpg",
rating: 4.3,
time: "18 min"
},
{
id: 24,
name: "Corn Dog",
image: "assets/images/food24.jpg",
rating: 4.2,
time: "15 min"
},
{
id: 25,
name: "Fritos",
image: "assets/images/food25.jpg",
rating: 4.0,
time: "5 min"
},
{
id: 26,
name: "Chaat",
image: "assets/images/food26.jpg",
rating: 4.8,
time: "10 min"
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
