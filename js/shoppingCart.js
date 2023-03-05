export const cartInventory = sessionStorage.getItem("cartInventory")
  ? JSON.parse(sessionStorage.getItem("cartInventory"))
  : [];

export function addToCart(data, index) {
  cartInventory.push({ ...data[index] });
  sessionStorage.setItem("cartInventory", JSON.stringify(cartInventory));
}
