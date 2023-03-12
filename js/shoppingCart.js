export const cartInventory = sessionStorage.getItem("cartInventory")
  ? JSON.parse(sessionStorage.getItem("cartInventory"))
  : [];

export function addToCart(data, index) {
  cartInventory.push({
    ...data[index],
    key: `${data[index].name}-${cartInventory.length + 1}`,
  });
  sessionStorage.setItem("cartInventory", JSON.stringify(cartInventory));
  location.reload();
}

export function removeFromCart(event, item, domEl) {
  item.findIndex((jacket) => jacket.key === event.target.dataset.key) !== -1 &&
    item.splice(
      item.findIndex((jacket) => jacket.key === event.target.dataset.key),
      1
    );
  sessionStorage.setItem("cartInventory", JSON.stringify(item));
  renderOrder(JSON.parse(sessionStorage.getItem("cartInventory")), domEl);

  document
    .querySelectorAll(".removeFromCart")
    .forEach((button) =>
      button.addEventListener("click", (event) =>
        removeFromCart(event, item, domEl)
      )
    );
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
  <a class="a--cart" class="btn" href="../product-list.html">Our Jackets</a>
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
