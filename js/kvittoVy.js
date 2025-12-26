import { getCartItems } from "./cartFunctions.js";
import { getMenuItems } from "./main.js";


////// 
// läser cart state, grupperar ID räknar mängd och pris, renderar kvitto
////


export function renderReceiptView() {
    const container = document.querySelector(".receipt-items");
    container.innerHTML = "";

    const cartItems = getCartItems();
    const menuItems = getMenuItems();

    const grouped = {};

    // först när ID kommer in, skapa entry, varje repeat öka kvantite
    cartItems.forEach(id => {
        if (!grouped[id]) {
            const item = menuItems.find(i => i.id === id);
            grouped[id] = { item, qty: 1 };
        } else {
            grouped[id].qty++;
        }
    });

    let total = 0;

// loopa genom varje köpt item, skapa rad per vara, adda totalen, skriver inn resultat på sidan
    Object.values(grouped).forEach(({ item, qty }) => {
        const row = document.createElement("div");
        row.classList.add("receipt-row");

        const lineTotal = item.price * qty;
        total += lineTotal;

        row.innerHTML = `
            <span>
                <strong>${item.name}</strong><br>
                <small>${qty} styck</small>
            </span>
            <span>${lineTotal} SEK</span>
        `;

        container.appendChild(row);
    });

    document.getElementById("receipt-total-price").textContent = total;
}