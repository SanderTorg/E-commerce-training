import { APIURL, ERROR_IF_NOT_GETTING_DATA } from "./constants.mjs";
import { createHTML, clearNode } from "./utils.mjs";
import { productTemplate } from "./products/productTemplate.mjs";
import { loadingSkeleton } from "./products/skeletonTemplate.mjs";

const containerProductsEl = document.querySelector("#js-products-render");

//Gotta put em products in a list
let allProducts = [];

// If some of the variables dont work its cracked
// Else if its working then inwoke setup wich then again inwokes fetchingProducts

// Inwokes the fetchingProducts if JS is smexy

setup();

async function setup() {
  if (!containerProductsEl) {
    console.error("JS is CRACKED!");
  } else {
    loadingSkeleton(containerProductsEl);

    const { allProducts } = await fetchingProducts();

    renderProductsListEl(allProducts);

    containerProductsEl.addEventListener("click", onProductClick);
  }
}

// fetching (getting) products from an API with an async function
async function fetchingProducts() {
  let error = null;

  try {
    const response = await fetch(APIURL);
    const { data } = await response.json();
    allProducts = data;
    window.localStorage.setItem("products", JSON.stringify(allProducts));
  } catch (shiii) {
    console.error(ERROR_IF_NOT_GETTING_DATA, error?.message);
    error = shiii;
  }

  return {
    allProducts,
    error,
  };
}

function renderProductsListEl(list = []) {
  clearNode(containerProductsEl);

  list.forEach(({ id, title, images, price, description }) => {
    const template = productTemplate({
      id: id,
      title: title,
      imgUrl: images,
      imgAl: images,
      price: price,
      description: description,
    });

    const createNewEl = createHTML(template);

    containerProductsEl.append(createNewEl);
  });
}
