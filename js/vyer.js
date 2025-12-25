export function showView(id) {
    document.querySelectorAll(".vy")
    .forEach(v => v.classList.add("hidden"));

    document.getElementById(id).classList.remove("hidden");
}
