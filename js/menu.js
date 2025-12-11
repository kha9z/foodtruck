    import { showView } from "./vyer.js";

    document.getElementById("kundvagnKnapp").addEventListener("click", () => {
        showView("cartVy");
    });



document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(
        ".menu-items:not(.dips), .dips .valgrejer"
    );

    items.forEach(item => {
        item.addEventListener("click", () => {
            item.classList.toggle("selected");

            saveItems();
        });
    });
});

function saveItems() {
    const selected = [...document.querySelectorAll(".selected")]
        .map(el => el.textContent.trim());

    localStorage.setItem("selectedItems", JSON.stringify(selected));
    updateCartCount(selected.length);
}

function updateCartCount(count) {
    const badge = document.getElementById("kund-count");

    if (count > 0) {
        badge.textContent = count;
        badge.style.display = "inline-block";
    } else {
        badge.style.display = "none"
    }
    }





