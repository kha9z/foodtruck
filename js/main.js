import { showView } from "./vyer.js";
import { getApiKey, createTenant, fetchMenu } from "./api.js";
import { renderCartView } from "./cartVy.js";
import { toggleCartItem, getCartItems, clearCart } from "./cartFunctions.js";
import { renderReceiptView } from "./kvittoVy.js";

let apiKey = "";
let tenant = null;
let menuItems = [];

// starta program, hämta API nyckel, skapa tenant, hämta menu
init();

async function init() {
    apiKey = await getApiKey();

    tenant = await createTenant(apiKey, getTenantName());
    function getTenantName() {
        return "Arnor";
    }

    menuItems = await fetchMenu(apiKey);
    console.log("Menu from API:", menuItems);

    renderMenu(menuItems.items);
    addMenuClickEvents();
}

function renderMenu(menu) {
    const menyVy = document.getElementById("menyVy");

// välja vart olika saker ska hamna
    const containers = {
        wonton: menyVy.querySelector(".wonton-container"),
        dip: menyVy.querySelector(".dip-container"),
        drink: menyVy.querySelector(".drink-container")
    };

    menu
        .filter(item => item.type === "wonton")
        .forEach(item => {
            const div = document.createElement("div");
            div.classList.add("menu-items");
            div.dataset.id = item.id;

            div.innerHTML = `
                <h3>${item.name} ........ ${item.price} SEK</h3>
                <p>${item.description}</p>
            `;

            containers.wonton.appendChild(div);
        });

    menu
        .filter(item => item.type === "dip" || item.type === "drink")
        .forEach(item => {
            const btn = document.createElement("button");
            btn.classList.add("menu-items");
            btn.dataset.id = item.id;
            btn.textContent = item.name;

            containers[item.type].appendChild(btn);
        });
}


function addMenuClickEvents() {
    document.querySelectorAll(".menu-items").forEach(item => {
        const id = Number(item.dataset.id);

// tillägg till karten med o klicka, visa att den är klickat, uppdatera kart badgen
        item.addEventListener("click", () => {
            toggleCartItem(id);
            updateMenuSelection();
            updateCartCount(getCartItems().length);
        });
    });
}

// om vara klickas(highlight), om inte icke highlight, 
function updateMenuSelection() {
    const cartItems = getCartItems();

    document.querySelectorAll(".menu-items").forEach(el => {
        const id = Number(el.dataset.id);
        el.classList.toggle("selected", cartItems.includes(id));
    });
}

// uppdaterar kart badgen, visar bara om nånting har varit valt
function updateCartCount(count) {
    const badge = document.getElementById("kund-count");
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline-block" : "none";
}

function hideCartBadge() {
    const badge = document.getElementById("kund-count");
    badge.style.display = "none";
}

function showCartBadgeIfNeeded() {
    const badge = document.getElementById("kund-count");
    const count = getCartItems().length;

    badge.textContent = count;
    badge.style.display = count > 0 ? "inline-block" : "none";
}

// används av ny beställning kannparna
function resetOrder() {
    clearCart();
    updateCartCount(0);
    showCartBadgeIfNeeded();

    document
        .querySelectorAll(".menu-items.selected")
        .forEach(el => el.classList.remove("selected"));

    showView("menyVy");
}


export function getMenuItems() {
    return menuItems.items;
}


document.getElementById("kundvagnKnapp")
  ?.addEventListener("click", () => {
      showView("cartVy");
      hideCartBadge();
      renderCartView();
  });

document.querySelector(".checkout-btn")
  ?.addEventListener("click", () => {
      const msg = document.getElementById("empty-cart-msg");

      if (getCartItems().length === 0) {
          msg.classList.remove("hidden");
          return;
      }

      msg.classList.add("hidden");
      showView("orderVy");
  });

document.getElementById("newOrderBtn")
    ?.addEventListener("click", resetOrder);

document.getElementById("receiptBtn")
  ?.addEventListener("click", () => {
      showView("receiptVy");
      renderReceiptView();
  });

document.getElementById("receiptNewOrder")
    ?.addEventListener("click", resetOrder);

 document.getElementById("backToMenuBtn")
    ?.addEventListener("click", () => {
      showView("menyVy");
      showCartBadgeIfNeeded();
  });