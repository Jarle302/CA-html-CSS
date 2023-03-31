import { addToCart, cartInventory, popUp } from "./shoppingCart.js";
import { getContrastColor } from "./GOTTENFROMCHATGPTcontrastfriendlyColor.js";
import { getItems, baseUrl } from "./imports.js";

getItems(baseUrl, renderList);

function renderList({ name, prices, images, on_sale, id }, index) {
  document.querySelector(".product-list__section").innerHTML += ` 
    <div class="product-list__card">
    <a href="../product-specifikk.html?id=${id}" class="product-list--image-container">
      <img
        src=${images[0].src}
        alt="${name} jacket" />
        </a>
      <div class="product-list__div--name-and-price">
        <p class="card__p--product-name">${name}</p>
      
        <p class="card__p--price">${
          !on_sale ? prices.regular_price : prices.sale_price
        }${prices.currency_code}</p>
        <button class="product-list__button--add-to-cart btn--list">Add to cart</button>
        <a class="btn--list btn--second" href="../product-specifikk.html?id=${id}">Read more</a>
      </div>
    </div>
  `;
}

document
  .querySelectorAll(".product-list__button--add-to-cart")
  .forEach((button, index) =>
    button.addEventListener("click", () => addToCart(data, index))
  );

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
