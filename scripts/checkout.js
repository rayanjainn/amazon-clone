import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import "../data/cart-oop.js";
// import "../data/cart-class.js";
import { loadProducts } from "../data/products.js";
import { renderCheckout } from "./checkout/checkout.js";

new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckout();
});

// loadProducts(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
//   renderCheckout();
// });
