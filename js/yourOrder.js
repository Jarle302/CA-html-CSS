import { cartInventory, removeFromCart, renderCart } from "./shoppingCart.js";

const queryString = document.location.search;
const parameters = new URLSearchParams(queryString);
const jacketIndex = parameters.get("index");

document.querySelector(
  ".back-arrow"
).href = `../product-specifikk.html?index=${jacketIndex}`;

const orderList = document.querySelector("#table--your-order");

renderCart(
  cartInventory,
  document.querySelector(".your-order__div--content"),
  orderList
);

document
  .querySelectorAll(".removeFromCart")
  .forEach((button) =>
    button.addEventListener("click", (event) =>
      removeFromCart(event, cartInventory, orderList)
    )
  );
