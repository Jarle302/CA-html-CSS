export const cartInventory = sessionStorage.getItem("cartInventory")
  ? JSON.parse(sessionStorage.getItem("cartInventory"))
  : [];

export function addToCart(data, index) {
  let sizeSelect = document.querySelector("#Size").value
    ? document.querySelector("#Size").value
    : "M";
  let colorRadio = document.querySelector(`input[name="color"]:checked`)
    ? document.querySelector('input[name="color"]:checked').value
    : "black";

  document
    .querySelector("#Size")
    .addEventListener(
      "change",
      () => (sizeSelect = document.querySelector("#Size").value)
    );

  document.querySelectorAll(`input[name="color"]`).forEach((button) => {
    button.addEventListener(
      "change",
      () =>
        (colorRadio = document.querySelector(
          `input[name="color"]:checked`
        ).value)
    );
  });

  cartInventory.push({
    ...data[index],
    key: `${data[index].name}-${cartInventory.length + 1}`,
    color: `${colorRadio}`,
    size: `${sizeSelect}`,
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
  console.log(test, cartInventory, index);

  popUp(
    JSON.parse(sessionStorage.getItem("cartInventory")),
    JSON.parse(sessionStorage.getItem("cartInventory")).length - 1
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
      (jacket) => `<tr>
  <td>${jacket.name}</td>
  <td>${jacket.price}$</td>
  <td><img class="small-image" src=${jacket.img} alt=${jacket.name} jacket></td>
<td> <button data-key=${jacket.key} class="removeFromCart">Remove</button> </td>
</tr>
 `
    )
    .join("");

  domEl.innerHTML += ` <hr></hr> <tr>
  <td>Totall</td>
  <td>${cartInventory.reduce(
    (acc, cartInventory) => acc + cartInventory.price,
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

function popUp(data, jacketIndex) {
  document.querySelector(".popUp").innerHTML = `
  <div class="popUp--container">
      <button class="button--x" >X</button>
      <h2>${data[jacketIndex].name}</h2>
      <h3 class="h3--popUp">
        You have sucessfully placed this item in your cart
      </h3>
      <table>
        <tr>
          <td>Color</td>
          <td>${data[jacketIndex].color}</td>
        </tr>
        <tr>
          <td>Size</td>
          <td>${data[jacketIndex].size}</td>
        </tr>
      </table>
      
  <img class="imgPopUp" src=${data[jacketIndex].img} alt=${data[jacketIndex].name} jacket>

  <div class="button--popUp">
  <a href="product-list.html" class="btn">Continue shopping</a>
  <a href="your-order.html" class="btn btn--second">Your order</a>
  </div>
  </div>
    `;
  document.querySelector(".popUp").style.display = "inline";
  document.querySelector(".button--x").addEventListener("click", () => {
    document.querySelector(".popUp").style.display = "none";
  });
  console.log(data);
}
