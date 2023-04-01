import { addToCart, cartInventory, popUp } from "./shoppingCart.js";
import { getContrastColor } from "./GOTTENFROMCHATGPTcontrastfriendlyColor.js";
import { getItems, baseUrl } from "./imports.js";
const sizeSelect = "";
const colorRadio = "";
getItems(
  baseUrl,
  renderList,
  document.querySelector(".product-list__section"),
  addListener
);

function renderList({ name, prices, images, on_sale, attributes, id }) {
  return `<div class="product-list__card">
    <a href="../product-specifikk.html?id=${id}" class="product-list--image-container">
      <img
        src=${images[0].src}
        alt="${name} jacket" />
        </a>
        <form>
        <div class="container--buttons" >
        <label for=Size${id}>Size</label>
                  <select name=Size${id} id=Size${id}>
                  ${attributes[1].terms.map(
                    (size) => `<option value=${size.name}>${size.name}</option>`
                  )}            
                  </select>
                  ${attributes[0].terms
                    .map(
                      (color) => ` 
                    <input type="radio" class="input--radio"  id="color--${
                      color.name
                    }${id}" name="color${id}" value="${color}" >
        <label class="label--radio" style="background-color:${
          color.name
        }" for="color--${color.name}${id}"> <span style="color:${
                        color === "black" ? "white" : "black"
                      }" }>${color.name} </span></label>`
                    )
                    .join("")}            
        </div>
        </form>
      <div class="product-list__div--name-and-price">
        <p class="card__p--product-name">${name}</p>
      
        <p class="card__p--price">${
          !on_sale ? prices.regular_price : prices.sale_price
        }${prices.currency_code}</p>
        <button id="addToCartButton${id}" class="product-list__button--add-to-cart btn--list">Add to cart</button>
        <a class="btn--list btn--second" href="../product-specifikk.html?id=${id}">Read more</a>
      </div>
    </div>
  `;
}

export function fixColors(data, number, colorArr) {
  return colorArr
    .map(
      (color, index) =>
        ` 
  <input type="radio" class="input--radio" id="color--${color}${number}" name="color${number}" value="${color}" >
  <label class="label--radio" style="background-color:${color}" for="color--${color}${number}"> <span style="color:${getContrastColor(
          data[number].hexColor[index]
        )}">${color}</span></label>`
    )
    .join("");
}

/*  <form>
        <div class="container--buttons" >
<label for="Size${index}">Size</label>
          <select name="Size" id="Size${index}">
          ${data[index].size.map(
            (size) => `<option value=${size}>${size}</option>`
          )}            
          </select>
          ${fixColors(data, index, data[index].color)}            
</div>
        </form> */

function addListener({ name, images, on_sale, prices, id }) {
  document
    .querySelector(`#Size${id}`)
    .addEventListener(
      "change",
      () => (sizeSelect = document.querySelector(`#Size${id}`).value)
    );

  document.querySelectorAll(`input[name="color${id}]"`).forEach((button) => {
    button.addEventListener(
      "change",
      () =>
        (colorRadio = document.querySelector(
          `input[name="color${id}"]:checked`
        ).value)
    );
  });

  document
    .querySelector(`#addToCartButton${id}`)
    .addEventListener("click", () =>
      addToCart(name, images, on_sale, prices, id)
    );
}
