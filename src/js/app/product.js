import { productGroup, productTemplate } from "../core/selectors.js";

export const createProduct = (product) => {
  const template = productTemplate.content.cloneNode(true);
  template.querySelector(".product-img").src = product.image;
  template.querySelector(".product-title").innerText = product.title;
  template.querySelector(".product-description").innerText =
    product.description;
  template.querySelector(".product-price").innerText = product.price;
  template.querySelector(
    ".product-rating"
  ).innerText = `${product.rating.rate} / ${product.rating.count}`;
  return template;
};

export const renderProdcut = (products) => {
  products.forEach((product) => productGroup.append(createProduct(product)));
};
