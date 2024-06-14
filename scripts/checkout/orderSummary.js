import { cart, removeFromcart, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions, getDelivery } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckout } from "./checkout.js";

export function renderOrderSummary() {
  let cartHTML = "";
  cart.forEach((cartItem) => {
    const matchingProduct = getProduct(cartItem.productId);

    const deliveryOption = getDelivery(cartItem.deliveryId);
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "day");

    const date = deliveryDate.format("dddd, MMMM D");

    cartHTML += `<div class="cart-item-container card-item-container-${
      matchingProduct.id
    }" >
            <div class="delivery-date">Delivery date: ${date}</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">${matchingProduct.getPrice()}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label-${
                    matchingProduct.id
                  }">${cartItem.quantity}</span> </span>
                  <span class="update-quantity-link link-primary" data-product-id='${
                    matchingProduct.id
                  }'>
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary" data-product-id='${
                    matchingProduct.id
                  }'>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
                
              </div>
            </div>
          </div>`;
  });
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "day");

      const date = deliveryDate.format("dddd, MMMM D");
      const price = deliveryOption.priceCents
        ? `$${(deliveryOption.priceCents / 100).toFixed(2)} -`
        : "FREE";
      const isChecked = deliveryOption.id === cartItem.deliveryId;
      html += `<div class="delivery-option" data-product-id="${
        matchingProduct.id
      }"
    data-delivery-id="${deliveryOption.id}">
                  <input
                    type="radio"
                    ${isChecked ? "checked" : ""}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">${date}</div>
                    <div class="delivery-option-price">${price} Shipping</div>
                  </div>
                </div> `;
    });
    return html;
  }

  document.querySelector(".order-summary").innerHTML = cartHTML;

  document.querySelectorAll(".delete-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromcart(productId);

      const container = document.querySelector(
        `.card-item-container-${productId}`
      );
      container.remove();
      renderPaymentSummary();
      renderCheckout();
    });
  });

  document.querySelectorAll(".delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryId } = element.dataset;
      updateDeliveryOption(productId, deliveryId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
