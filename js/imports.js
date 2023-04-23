export const api_key = "ck_4f0a4c81702c16a179549269f843d8a929a00ab7";
export const api_secret = "cs_62e75a49c9254d8445953f4a2e012a57b3debfb3";
export async function getItems(getItems, callBack, domEL, listenerFunction) {
  const products = await fetch(getItems, {
    method: "GET",
    headers: { Authorization: "Basic " + btoa(`${api_key}:${api_secret}`) },
  });
  const productsArr = await products.json();
  console.log({ productsArr });
  const arrwithImage = Array.isArray(productsArr)
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
  console.log({ arrwithImage });
  Array.isArray(arrwithImage)
    ? (domEL.innerHTML += arrwithImage
        .map((object) => callBack(object))
        .join(""))
    : callBack(arrwithImage);
  Array.isArray(arrwithImage) &&
    arrwithImage.forEach((button) => listenerFunction(button));
  console.log();
}

// This function was made by Abi
export function getValidImageURl(imgStr) {
  // const imgStr = 'https://jarletollaksen.com/r/n/wp-content/uploads/2023/03/Immovable.png';
  const arr = imgStr.split("/");
  const imageName = arr[arr.length - 1];
  const validImageURl = `https://jarletollaksen.com/wp-content/uploads/2023/03/${imageName}`;
  console.log({ imageName, validImageURl });
  return validImageURl;
}

export const baseUrl = "https://jarletollaksen.com/wp-json/wc/store/products";
