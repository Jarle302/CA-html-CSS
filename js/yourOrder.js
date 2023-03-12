import { cartInventory, removeFromCart, renderCart } from "./shoppingCart.js";

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
