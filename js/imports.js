export async function getItems(getItems, callBack) {
  const products = await fetch(getItems);
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
    ? arrwithImage.forEach((object) => callBack(object))
    : callBack(arrwithImage);
}

export function getValidImageURl(imgStr) {
  // const imgStr = 'https://jarletollaksen.com/r/n/wp-content/uploads/2023/03/Immovable.png';
  const arr = imgStr.split("/");
  const imageName = arr[arr.length - 1];
  const validImageURl = `https://jarletollaksen.com/wp-content/uploads/2023/03/${imageName}`;
  console.log({ imageName, validImageURl });
  return validImageURl;
}

export const baseUrl = "https://jarletollaksen.com/wp-json/wc/store/products";
