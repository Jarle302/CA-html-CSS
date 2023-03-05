import { data } from "./data.js";

function renderList({ name, price, img }, index) {
  document.querySelector(
    ".product-list__section"
  ).innerHTML += ` <a href="/product-specifikk.html?index=${index}">
    <div class="product-list__card">
      <img
        src=${img}
        alt="${name} jacket" />
      <div class="product-list__div--name-and-price">
        <p class="card__p--product-name">${name}</p>
        <p class="card__p--price">${price}$</p>
      </div>
    </div>
  </a>`;
}

data.forEach((jacket, index) => renderList(jacket, index));

console.log("test");
