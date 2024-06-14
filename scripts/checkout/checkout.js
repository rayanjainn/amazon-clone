import { cart } from "../../data/cart.js";

export function renderCheckout() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector(
    ".return-to-home-link"
  ).innerHTML = `${cartQuantity} items`;
}
