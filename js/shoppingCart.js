export const cartInventory = sessionStorage.getItem("cartInventory")
  ? JSON.parse(sessionStorage.getItem("cartInventory"))
  : [];

export function addToCart(data, index) {
  cartInventory.push({ ...data[index] });
  sessionStorage.setItem("cartInventory", JSON.stringify(cartInventory));
  location.reload();
}

const spanCartIcon = document.createElement("span");

const header = document.querySelector("header");

header.insertBefore(spanCartIcon, header.children[2]);

spanCartIcon.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Cart(<span class="redNumber">${cartInventory.length})</span>`;

spanCartIcon.classList.add("nav__icon--cart");

/*
const cartContainer = document.createElement("div");

header.insertBefore(cartContainer, header.children[2]);

cartContainer.innerHTML += cartInventory
  .map(
    (jacket) => `<tr>
  <td>${jacket.name}</td>
  <td>${jacket.price}$</td>
  <td><img class="small-image" src=${jacket.img} alt=${jacket.name} jacket></td>
</tr>
 `
  )
  .join("");

cartContainer.innerHTML += ` <hr></hr> <tr>
  <td>Totall</td>
  <td>${cartInventory.reduce(
    (acc, cartInventory) => acc + cartInventory.price,
    0
  )}$</td>
</tr>`;

cartContainer.style.display = "none";

cartContainer.addEventListener("mouseover", () => {
  cartContainer.style.display = "none"
    ? (cartContainer.style.display = "block")
    : (cartContainer.style.display = "none");
});

*/
