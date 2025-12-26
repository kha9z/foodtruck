// vad är i karten, 
// lägg till en item,
// ta bort ett item
// välj eller un-välj item
// börja om

let cartItems = [];

export function getCartItems() {
    return cartItems;
}

export function addToCart(id) {
    cartItems.push(id);
}

export function removeFromCart(id) {
    const index = cartItems.indexOf(id);
    if (index !== -1) {
        cartItems.splice(index, 1);
    }
}

export function toggleCartItem(id) {
    const index = cartItems.indexOf(id);
    if (index === -1) {
        cartItems.push(id);
    } else {
        cartItems.splice(index, 1);
    }
}

export function clearCart() {
    cartItems.length = 0;
}