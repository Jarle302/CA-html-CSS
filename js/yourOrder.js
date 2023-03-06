import { cartInventory } from "./shoppingCart.js";

document.querySelector("#table--your-order").innerHTML += cartInventory
  .map(
    (jacket) => `<tr>
  <td>${jacket.name}</td>
  <td>${jacket.price}$</td>
  <td><img class="small-image" src=${jacket.img} alt=${jacket.name} jacket></td>
</tr>
 `
  )
  .join("");

document.querySelector("#table--your-order").innerHTML += ` <hr></hr> <tr>
  <td>Totall</td>
  <td>${cartInventory.reduce(
    (acc, cartInventory) => acc + cartInventory.price,
    0
  )}$</td>
</tr>`;
