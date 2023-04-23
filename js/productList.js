import { addToCart, cartInventory, popUp } from "./shoppingCart.js";
import { getContrastColor } from "./GOTTENFROMCHATGPTcontrastfriendlyColor.js";
import {
  renderList,
  addListener,
  getAndrenderFeatured,
  app as productList,
  baseUrl,
  api_key,
  api_secret,
  getValidImageURl,
} from "./imports.js";

productList(
  baseUrl,
  renderList,
  document.querySelector(".product-list__section"),
  addListener,
  getAndrenderFeatured
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

/* I see that the Ca says to filter Filter Featured products from the list 
and show these in their own section. But the endpoint that has the featured prop
dont have the regular price, and sale price, ive read that this is an issue when having
variable products, so i decided to have two different endpoints, this enable me to render
featured products, but at the same time have the option to use props as sale price in the future
But incase that the requirement was to see that we can filter the list i made a function
to show how i would do that, if i had used one endpoint and gotten one big array
One could also just use the filter method to get the filtered products and invert it with 
! to get the nonfeatured products, but i like my approach more. I just logged the two arrays
but i were to use the function i would input the arrays into a renderfunction for featured 
and one for nonFeatured.
*/
function filterFeatured(arr) {
  const returnArray = [[], []];
  for (let i = 0; i < arr.length; i++) {
    arr[i].featured ? returnArray[0].push(arr[i]) : returnArray[1].push(arr[i]);
  }
  return returnArray;
}

fetch("https://jarletollaksen.com/wp-json/wc/v3/products", {
  method: "GET",
  headers: { Authorization: "Basic " + btoa(`${api_key}:${api_secret}`) },
})
  .then((data) => data.json())
  .then((data) => {
    const [featuredProducts, nonFeaturedProducts] = filterFeatured(data);
    console.log({ featuredProducts }, { nonFeaturedProducts });
  });
