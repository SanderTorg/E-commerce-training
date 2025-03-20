// Cart js

import { CURRENCY } from "./constants.mjs";
import { createHTML, clearNode } from "./utils.mjs";

const cartToggleBtnEL = document.querySelector("#js-cart-toggle");
const cartContainerEl = document.querySelector("#js-cart");
const cartCloseBtnEl = document.querySelector("#js-close-cart");

setup();

function setup() {
  if (!cartToggleBtnEL || !cartContainerEl || !cartCloseBtnEl) {
    console.error("JS is CRACKED!");
  } else {
    cartToggleBtnEL.addEventListener("click", toggleCartAside);
    cartCloseBtnEl.addEventListener("click", toggleCartAside);

    const products = getItemsFromStorage();
    renderCartItems(products);
  }
}

function toggleCartAside() {
  cartContainerEl.classList.toggle("is-open");
}

export function itemBtnAddToCart({ id, imgUrl, title, price, quantity = 1 }) {
  const products = getItemsFromStorage();

  products.push({
    id,
    title,
    imgUrl,
    price,
    quantity: quantity,
  });

  setItemsToStorage(products);

  renderCartItems(products);
}

export function getItemsFromStorage() {
  return JSON.parse(window.localStorage.getItem("cart")) ?? [];
}

function setItemsToStorage(items = []) {
  window.localStorage.setItem("cart", JSON.stringify(items));
}
