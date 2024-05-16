import { renderCategory } from "../app/category.js";
import { renderProdcut } from "../app/product.js";
import { categories, products } from "./data.js";

const initialRender = () => {
  renderCategory(categories);
  renderProdcut(products);
};

export default initialRender;
