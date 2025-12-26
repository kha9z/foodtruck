import { getCartItems, addToCart, removeFromCart } 
    from "./cartFunctions.js";

import { getMenuItems } from "./main.js";

// rendercartview kallas varje gång cartVyn är i gång, re-reders carten från början
export function renderCartView() {

    const container = document.querySelector(".cart-items");
    container.innerHTML = "";

// kallar efter current data, menun från apin
    const cartItems = getCartItems();
    const menuItems = getMenuItems();


// gruppera varer efter ID, skapa ID, öka qty
    const grouped = {};

    cartItems.forEach(id => {
        if (!grouped[id]) {
            const item = menuItems.find(i => i.id === id);
            grouped[id] = { item, qty: 1 };
        } else {
            grouped[id].qty++;
        }
    });

// räkna priset, item price * mängd
    let total = 0;

    Object.values(grouped).forEach(({ item, qty }) => {
        total += item.price * qty;

// skapa en rad med nafmn, pris, mängd, plus minus knapp
        const row = document.createElement("div");
        row.classList.add("cart-row");

        row.innerHTML = `
            <div class="cart-row-top">
                <strong>${item.name}</strong>
                <span>${item.price * qty} SEK</span>
            </div>
            <div class="cart-row-bottom">
                <button class="qty-btn minus">−</button>
                <span>${qty} stycken</span>
                <button class="qty-btn plus">+</button>
            </div>
        `;

// tillägg en sak, re-render
        row.querySelector(".plus").addEventListener("click", () => {
            addToCart(item.id);
            renderCartView();
        });

// ta bort en sak, re-render
        row.querySelector(".minus").addEventListener("click", () => {
            removeFromCart(item.id);
            renderCartView();
        });

        container.appendChild(row);
    });

    document.getElementById("cart-total-price").textContent = total;
}
