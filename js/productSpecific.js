import { data } from "./data.js";
import { addToCart, cartInventory } from "./shoppingCart.js";

const queryString = document.location.search;
const parameters = new URLSearchParams(queryString);
const jacketIndex = parameters.get("index");

function renderSpecific(data, index) {
  document.querySelector(".product-specific__section").innerHTML = `
    <h1 class="product-specific__h1">${data[index].name}</h1>
        <div class="product-specific__div">
          <img
            class="product-specific__img"
            src=${data[index].img}
            alt="${data[index].name} Jacket" />
          
<div class="container--buttons" >
<label for="Size">Size</label>
          <select name="Size" id="Size">
          ${data[index].size.map(
            (size) => `<option value=${size}>${size}</option>`
          )}            
          </select>
          ${data[index].color
            .map(
              (color) => ` 
            <input type="radio" class="input--radio" id="color--${color}" name="color" value="${color}" >
<label class="label--radio" style="background-color:${color}" for="color--${color}"></label>`
            )
            .join("")}            
</div>
          <div class="product-specific__div--name-and-price">
            <p class="product-specific__p--name">${data[index].name}</p>
            <p class="product-specific__p--price">${data[index].price}$</p>
          </div>
          <div class="product-specific__container--buttons">
          <a class="btn product-specific__button--cta" href="your-order.html?index=${jacketIndex}"
            >Your order</a
          >
          <button id="addToCartButton" class="btn product-specific__button--cta" href="your-order.html?index=${jacketIndex}"
            >Add to Cart </button>
            </div>
        </div>`;
}

renderSpecific(data, jacketIndex);

document
  .querySelector("#addToCartButton")
  .addEventListener("click", () => addToCart(data, jacketIndex));

console.log(cartInventory);
