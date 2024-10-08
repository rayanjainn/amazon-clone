import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDelivery } from "../../data/deliveryOptions.js";

export function renderPaymentSummary() {
  let productPriceCent = 0;
  let shippingPriceCent = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCent += product.priceCents * cartItem.quantity;

    const delivery = getDelivery(cartItem.deliveryId);
    shippingPriceCent += delivery.priceCents;
  });
  const totalBeforeTaxCent = productPriceCent + shippingPriceCent;
  const taxCent = totalBeforeTaxCent * 0.1;
  const totalCent = totalBeforeTaxCent + taxCent;

  const paymentSummaryHTML = `<div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div class="items">Items (0):</div>
            <div class="payment-summary-money">$${(
              Math.round(productPriceCent) / 100
            ).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(
              Math.round(shippingPriceCent) / 100
            ).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(
              Math.round(totalBeforeTaxCent) / 100
            ).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(
              Math.round(taxCent) / 100
            ).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(
              Math.round(totalCent) / 100
            ).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button> `;

  document.querySelector(".payment-summary").innerHTML = paymentSummaryHTML;

  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector(".items").innerHTML = `Items (${cartQuantity}):`;

  document
    .querySelector(".place-order-button")
    .addEventListener("click", async () => {
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Tpye": "application/json",
          },
          body: JSON.stringify({
            cart: cart,
          }),
        });
        const order = await response.json();
      } catch (error) {
        console.log("Erorr :", error);
      }

      window.location.href = "orders.html";
    });
}
