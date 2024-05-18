import Swal from "sweetalert2";
import {
  cartCount,
  cartItemCount,
  cartItemTemplate,
  cartTotal,
  productGroup,
} from "./selectors.js";

export const createCartItem = (product, quantity) => {
  const template = cartItemTemplate.content.cloneNode(true);
  template
    .querySelector(".cart-item")
    .setAttribute("cart-product-id", product.id);
  template.querySelector(".cart-item-img").src = product.image;
  template.querySelector(".product-title").innerText = product.title;
  template.querySelector(".cart-item-price").innerText = product.price;
  template.querySelector(".cart-item-coast").innerText =
    product.price * quantity;
  template.querySelector(".product-quantity").innerText = quantity;
  return template;
};

export const countCartItem = () => {
  const totalItemInCart = document.querySelectorAll(".cart-item");
  return totalItemInCart.length;
};

export const updateCartItemCount = () => {
  const currentTotal = countCartItem();
  cartItemCount.innerText = currentTotal;
  cartCount.innerText = currentTotal;
};

export const calculateCartCoastTotal = () => {
  const total = [...document.querySelectorAll(".cart-item-coast")].reduce(
    (pv, cv) => pv + parseFloat(cv.innerText),
    0
  );
  return total;
};

export const updateCartTotal = () => {
  const total = calculateCartCoastTotal().toFixed(2);
  cartTotal.innerText = total;
};

export const handlerCartItemGroup = (event) => {
  if (event.target.classList.contains("cart-item-remove")) {
    const currentCart = event.target.closest(".cart-item");

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        currentCart.remove();
        const currentProductId = currentCart.getAttribute("cart-product-id");
        const currentProduct = productGroup.querySelector(
          `[product-id='${currentProductId}']`
        );

        console.log(currentProduct);

        const currentProductAddCartBtn = currentProduct.querySelector(
          ".product-add-cart-btn"
        );
        currentProductAddCartBtn.removeAttribute("disabled");
        currentProductAddCartBtn.innerText = "Add to Cart";
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-start",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Remove record successfully",
        });
        updateCartTotal();
        updateCartItemCount();
      }
    });
  } else if (event.target.classList.contains("cart-q-add")) {
    // console.log("U click add btn");
    const currentCart = event.target.closest(".cart-item");
    const currentPrice = currentCart.querySelector(".cart-item-price");
    const currentQuantity = currentCart.querySelector(".product-quantity");
    const currentCoast = currentCart.querySelector(".cart-item-coast");

    currentQuantity.innerText = parseInt(currentQuantity.innerText) + 1;
    currentCoast.innerText = (
      currentPrice.innerText * currentQuantity.innerText
    ).toFixed(2);
    updateCartTotal();
    // console.log(calculateCartCoastTotal());
    // console.log(currentQuantity);
    console.log("q add");
  } else if (event.target.classList.contains("cart-q-sub")) {
    const currentCart = event.target.closest(".cart-item");
    const currentPrice = currentCart.querySelector(".cart-item-price");
    const currentQuantity = currentCart.querySelector(".product-quantity");
    const currentCoast = currentCart.querySelector(".cart-item-coast");

    if (currentQuantity > 1) {
      currentQuantity.innerText = parseInt(currentQuantity.innerText) - 1;
      currentCoast.innerText = (
        currentPrice.innerText * currentQuantity.innerText
      ).toFixed(2);
      updateCartTotal();
    }
  }
};
