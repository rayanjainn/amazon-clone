import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import "../data/cart-oop.js";
// import "../data/cart-class.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { renderCheckout } from "./checkout/checkout.js";

loadProductsFetch().then(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckout();
});

// loadProducts(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
//   renderCheckout();
// });
