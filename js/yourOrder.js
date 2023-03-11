import { renderOrder, cartInventory, removeFromCart } from "./shoppingCart.js";

renderOrder(cartInventory);

document
  .querySelectorAll(".removeFromCart")
  .forEach((button) =>
    button.addEventListener("click", (event) =>
      removeFromCart(event, cartInventory)
    )
  );
