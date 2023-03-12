import { cartInventory, removeFromCart, renderCart } from "./shoppingCart.js";

const orderList = document.querySelector("#table--your-order");

renderCart(
  cartInventory,
  document.querySelector(".your-order__div--content"),
  orderList
);

/*
cartInventory.length === 0
  ? (document.querySelector(".your-order__div--content").innerHTML = `
      
        <h2>Cart empty</h2>
        <p>
          To add something to your cart, browse our fantastic jackets, click on
          the one you like to read more, then add it to cart if it fits your
          needs
        </p>
        <a class="btn" href="../product-list.html">Our Jackets</a>
    `)
  : renderOrder(cartInventory, orderList);
*/
document
  .querySelectorAll(".removeFromCart")
  .forEach((button) =>
    button.addEventListener("click", (event) =>
      removeFromCart(event, cartInventory, orderList)
    )
  );
