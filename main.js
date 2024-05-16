import Shop from "./src/js/Shop.js";
import { createCategory } from "./src/js/app/category.js";
import { createProduct } from "./src/js/app/product.js";
import "./style.css";
import "flowbite";

const shop = new Shop();
shop.init();

// console.log(createProduct(prodcuts[0]));