import { data } from "./data.js";
import { addToCart, cartInventory } from "./shoppingCart.js";
import { getItems, baseUrl } from "./imports.js";

const queryString = document.location.search;
const parameters = new URLSearchParams(queryString);
const jacketIndex = parameters.get("id");
console.log(jacketIndex);
getItems(baseUrl + "/" + jacketIndex, renderSpecific);

function renderSpecific({
  name,
  description,
  short_description,
  on_sale,
  prices,
  images,
  attributes,
  id,
}) {
  document.querySelector(".product-specific__section").innerHTML = `
    <h1 class="product-specific__h1">${name}</h1>
    <div class="product-specific__div">
          <img
            class="product-specific__img"
            src=${images[0].src}
            alt="${name} Jacket" />
        </div>
        
        <div class="product-specific--second-col">
        <h3> Description </h3>
        <p class="product-specific--description">${short_description}</p>
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
                    }${id}" name="color${id}" value="${color.name}" >
        <label class="label--radio" style="background-color:${
          color.name
        }" for="color--${color.name}${id}"> <span style="color:${
                        color === "black" ? "white" : "black"
                      }" }>${color.name} </span></label>`
                    )
                    .join("")}            
        </div>
                  <div class="product-specific__div--name-and-price">
                    <p class="product-specific__p--price">${
                      !on_sale ? prices.regular_price : prices.sale_price
                    }${prices.currency_code}</p>
                  </div>
                  <div class="product-specific__container--buttons">
                 
                  <button id="addToCartButton" class="btn product-specific__button--cta" href="your-order.html?id=${jacketIndex}"
                    >Add to Cart </button>
                    
                   </div>  <p></p></div> <div><h3>Product info</h3>${description}</div>`;

  if (document.querySelector("#addToCartButton"))
    document
      .querySelector("#addToCartButton")
      .addEventListener("click", () =>
        addToCart(name, images, on_sale, prices, id)
      );
  if (document.querySelector("input[type=radio]"))
    document.querySelector("input[type=radio]").checked = true;
}

fetch("https://jsonplaceholder.typicode.com/comments/").then((data) =>
  data.json().then((data) => {
    const comments = data
      .slice(0, 10)
      .map(
        (data) =>
          ` <h3 class="comment__h3">User: ${
            data.email
          }</h3> <div class="stars"> ${'<i class="fa-solid fa-star"></i>'.repeat(
            Math.floor(Math.random() * 5)
          )} </div> <p class="comment__p"> <span class="comment__span">Comment:</span> ${
            data.body
          }</p> <hr>`
      )
      .join("");
    document.querySelector(".comments").innerHTML += comments;
  })
);

console.log(cartInventory);
