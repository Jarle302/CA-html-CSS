import { cartInventory, addToCart } from "./shoppingCart.js";
export const api_key = "ck_4f0a4c81702c16a179549269f843d8a929a00ab7";
export const api_secret = "cs_62e75a49c9254d8445953f4a2e012a57b3debfb3";
export async function app(
  getItems,
  callback,
  domEl,
  listenerFunction,
  optionalCallBack
) {
  const products = await fetch(getItems, {
    method: "GET",
    headers: { Authorization: "Basic " + btoa(`${api_key}:${api_secret}`) },
  });
  const productsArr = await products.json();
  const arrwithImage = fixPriceAndImage(productsArr);
  isArrOrOneThenUseFunc(arrwithImage, callback, domEl);
  Array.isArray(arrwithImage) &&
    arrwithImage.forEach((button) => listenerFunction(button));

  if (optionalCallBack) {
    optionalCallBack();
  }
}

//This function is written by Abi
export function getValidImageURl(imgStr) {
  // const imgStr = 'https://jarletollaksen.com/r/n/wp-content/uploads/2023/03/Immovable.png';
  const arr = imgStr.split("/");
  const imageName = arr[arr.length - 1];
  const validImageURl = `https://jarletollaksen.com/wp-content/uploads/2023/03/${imageName}`;
  console.log({ imageName, validImageURl });
  return validImageURl;
}

export const baseUrl = "https://jarletollaksen.com/wp-json/wc/store/products";

export function fixPriceAndImage(productsArr) {
  return Array.isArray(productsArr)
    ? productsArr.map((element) => ({
        ...element,
        images: [
          {
            ...element.images[0],
            src: getValidImageURl(element.images[0].src),
          },
        ],
        prices: {
          ...element.prices,
          regular_price: element.prices.regular_price.slice(
            0,
            element.prices.regular_price.length - 2
          ),
          sale_price: element.prices.regular_price.slice(
            0,
            element.prices.regular_price.length - 2
          ),
        },
      }))
    : {
        ...productsArr,
        images: [
          {
            ...productsArr.images[0],
            src: getValidImageURl(productsArr.images[0].src),
          },
        ],
        prices: {
          ...productsArr.prices,
          regular_price: productsArr.prices.regular_price.slice(
            0,
            productsArr.prices.regular_price.length - 2
          ),
          sale_price: productsArr.prices.regular_price.slice(
            0,
            productsArr.prices.regular_price.length - 2
          ),
        },
      };
}

export function isArrOrOneThenUseFunc(arr, callback, domEl) {
  Array.isArray(arr)
    ? (domEl.innerHTML += arr.map((object) => callback(object)).join(""))
    : callback(arr);
}

export function renderList({ name, prices, images, on_sale, attributes, id }) {
  return `<div class="product-list__card">
    <a href="../product-specifikk.html?id=${id}" class="product-list--image-container">
      <img
        src=${images[0].src}
        alt="${name} jacket" />
        </a>
        <div class="product-list--content-container">
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
                      (color, index) => ` 
                    <input type="radio" ${
                      index === 0 ? "checked" : ""
                    } class="input--radio"  id="color--${
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
        </form>
      <div class="product-list__div--name-and-price">
        <p class="card__p--product-name">${name}</p>
              <p class="card__p--price">${
                !on_sale ? prices.regular_price : prices.sale_price
              }${prices.currency_code}</p>
        <button data-key=${name}-${
    cartInventory.length
  }  id="addToCartButton${id}" class="product-list__button--add-to-cart btn--list">Add to cart</button>
        <a class="btn--list btn--second" href="../product-specifikk.html?id=${id}">Read more</a>
      </div>
      </div>
    </div>
  `;
}

export function getAndrenderFeatured() {
  fetch("https://jarletollaksen.com/wp-json/wc/v3/products?featured=true", {
    method: "GET",
    headers: { Authorization: "Basic " + btoa(`${api_key}:${api_secret}`) },
  })
    .then((data) => data.json())
    .then((data) =>
      data.forEach((product) =>
        renderFeatured(
          product,
          document.querySelector(".product-list--featured")
        )
      )
    );
}

function renderFeatured({ name, short_description, id, images }, domEL) {
  domEL.innerHTML += `
  <a href="../product-specifikk.html?id=${id}" class="featured--card">
  <span><h2>Featured</h2></span>
    <div class="featured--card__image-container">
    <img class="featured--card__image"
        src=${getValidImageURl(images[0].src)}
        alt="${name} jacket" />
    </div>
<div class="featured--card__text-container">
<h3>${name}</h3> <p>${short_description}</p></div>
  </a>`;
}

export function addListener({ name, images, on_sale, prices, id }) {
  document
    .querySelector(`#Size${id}`)
    .addEventListener(
      "change",
      () => (sizeSelect = document.querySelector(`#Size${id}`).value)
    );

  document.querySelectorAll(`input[name=color${id}]`).forEach((button) => {
    button.addEventListener(
      "change",
      (e) => document.querySelector(`input[name=color${id}]:checked`).value
    );
  });

  document
    .querySelector(`#addToCartButton${id}`)
    .addEventListener("click", () =>
      addToCart(name, images, on_sale, prices, id)
    );
}
