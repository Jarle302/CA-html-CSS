export const cartInventory = sessionStorage.getItem("cartInventory")
  ? JSON.parse(sessionStorage.getItem("cartInventory"))
  : [];

export function addToCart(name, images, on_sale, prices, id) {
  console.log({ name, images, on_sale, prices, id });

  cartInventory.push({
    name: name,
    price: !on_sale ? prices.regular_price : prices.sale_price,
    key: `${name}-${cartInventory.length}`,
    color: document.querySelector(`input[name="color${id}"]:checked`).value,
    size: document.querySelector(`#Size${id}`).value,
    img: images[0].src,
    id: id,
  });
  sessionStorage.setItem("cartInventory", JSON.stringify(cartInventory));

  renderCart(
    JSON.parse(sessionStorage.getItem("cartInventory")),
    cartContainer
  );
  cartIcon.innerHTML = `<button class="button--cart" > <i class="fa-solid fa-cart-shopping"></i> Cart(<span class="redNumber">${cartInventory.length})</span> </button>`;
  document.querySelector(".button--cart").addEventListener("click", () => {
    cartContainer.style.display =
      cartContainer.style.display === "none"
        ? (cartContainer.style.display = "grid")
        : (cartContainer.style.display = "none");
  });

  document
    .querySelectorAll(".removeFromCart")
    .forEach((button) =>
      button.addEventListener("click", (event) =>
        removeFromCart(event, cartInventory, cartContainer)
      )
    );
  const test = JSON.parse(sessionStorage.getItem("cartInventory"));

  popUp(
    JSON.parse(sessionStorage.getItem("cartInventory"))[
      JSON.parse(sessionStorage.getItem("cartInventory")).length - 1
    ]
  );
}

export function removeFromCart(event, item, domEl) {
  item.findIndex((jacket) => jacket.key === event.target.dataset.key) !== -1 &&
    item.splice(
      item.findIndex((jacket) => jacket.key === event.target.dataset.key),
      1
    );
  sessionStorage.setItem("cartInventory", JSON.stringify(item));
  renderOrder(JSON.parse(sessionStorage.getItem("cartInventory")), domEl);
  cartIcon.innerHTML = `<button class="button--cart" > <i class="fa-solid fa-cart-shopping"></i> Cart(<span class="redNumber">${cartInventory.length})</span> </button>`;

  document
    .querySelectorAll(".removeFromCart")
    .forEach((button) =>
      button.addEventListener("click", (event) =>
        removeFromCart(event, item, domEl)
      )
    );
  item.length === 0 &&
    (domEl.innerHTML = `
    <h2 class="h2--cart">Cart empty</h2>
<p class="p--cart" >
  To add something to your cart, browse our fantastic jackets, click on
  the one you like to read more, then add it to cart if it fits your
  needs
</p>
<a  class="btn" href="../product-list.html">Our Jackets</a>

`);
  document.querySelector(".button--cart").addEventListener("click", () => {
    cartContainer.style.display =
      cartContainer.style.display === "none"
        ? (cartContainer.style.display = "grid")
        : (cartContainer.style.display = "none");
  });
}

export function renderOrder(orderArr, domEl) {
  domEl.innerHTML = orderArr
    .map(
      (jacket, index) => `
    <tr style="background-color:${index % 2 ? "grey" : "white"}">
  <td>${jacket.name}</td> <td>  <img class="small-image" src=${
        jacket.img
      } alt=${jacket.name} jacket></td> <td> <button data-key=${
        jacket.key
      } class="removeFromCart">Remove</button> </td>
  </tr>
  <tr style="background-color:${index % 2 ? "grey" : "white"}">
  <td>${jacket.price}$</td>
  <td> ${jacket.size}</td>
  <td>${jacket.color}</td>
</tr>`
    )
    .join("");

  domEl.innerHTML += ` <tr>
  <td>Totall</td>
  <td>${cartInventory.reduce(
    (acc, cartInventory) => parseInt(acc) + parseInt(cartInventory.price),
    0
  )}$</td>
</tr>   <a class="btn" href="/checkout.html"
>Proceed to checkout</a
>`;
}

export function renderCart(arr, domEl, domElTwo = domEl) {
  arr.length === 0
    ? (domEl.innerHTML = `
      <h2 class="h2--cart">Cart empty</h2>
  <p class="p--cart" >
    To add something to your cart, browse our fantastic jackets, click on
    the one you like to read more, then add it to cart if it fits your
    needs
  </p>
  <a  class="btn" href="../product-list.html">Our Jackets</a>
`)
    : renderOrder(arr, domElTwo);
}

const cartIcon = document.createElement("span");

const header = document.querySelector("header");

header.insertBefore(cartIcon, header.children[2]);

cartIcon.innerHTML = `<button class="button--cart" > <i class="fa-solid fa-cart-shopping"></i> Cart(<span class="redNumber">${cartInventory.length})</span> </button>`;

cartIcon.classList.add("nav__icon--cart");

const cartContainer = document.createElement("div");
cartContainer.classList.add("shopping-cart");

header.insertBefore(cartContainer, header.children[2]);

renderCart(cartInventory, cartContainer);

document.querySelector(".button--cart").addEventListener("click", () => {
  cartContainer.style.display =
    cartContainer.style.display === "none"
      ? (cartContainer.style.display = "grid")
      : (cartContainer.style.display = "none");
});

document
  .querySelectorAll(".removeFromCart")
  .forEach((button) =>
    button.addEventListener("click", (event) =>
      removeFromCart(event, cartInventory, cartContainer)
    )
  );

export function popUp({ name, color, size, img, id }) {
  document.querySelector(".popUp").innerHTML = `
  <div class="popUp--container">
      <button class="button--x" >X</button>
      <h2>${name}</h2>
      <h3 class="h3--popUp">
        You have sucessfully placed this item in your cart
      </h3>
      <table>
        <tr>
          <td>Color</td>
          <td>${color}</td>
        </tr>
        <tr>
          <td>Size</td>
          <td>${size}</td>
        </tr>
      </table>
      
  <img class="imgPopUp" src=${img} alt=${name} jacket>

  <div class="button--popUp">
  <a href="product-list.html" class="btn btn--second btn--small">Continue shopping</a>
  <a href="your-order.html?index=${id}" class="btn btn--small">Your Cart</a>
  </div>
  </div>
    `;
  document.querySelector(".popUp").style.display = "inline";
  document.querySelector(".button--x").addEventListener("click", () => {
    document.querySelector(".popUp").style.display = "none";
  });
}

/*
document
  .querySelectorAll(".color--div")
  .forEach(
    (element, index) =>
      (element.style.backgroundColor = JSON.parse(
        sessionStorage.getItem("cartInventory")[index].color
      ))
  );
*/
