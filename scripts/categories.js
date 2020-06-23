let products = document.querySelectorAll(".tab-product");
let tabLinks = document.querySelectorAll(".tab-link");

document.querySelectorAll(".picture").forEach(function (image) {
  let src = image.getAttribute("src");

  let img_replacement = document.createElement("div");
  img_replacement.src = src;
  img_replacement.classList.add("order-1", "picture-dimensions");
  img_replacement.style.backgroundSize = "auto 100%";
  img_replacement.style.backgroundRepeat = "no-repeat";
  img_replacement.style.backgroundPosition = "top";
  img_replacement.style.backgroundImage = "url(" + src + ")";
  image.parentElement
    .querySelector(".name-star-amount")
    .classList.add("order-2");
  image.parentNode.appendChild(img_replacement);
  image.style.display = "none";
});

tabLinks.forEach((tabLink) => {
  tabLink.addEventListener("click", function addSpace() {
    let linkData = tabLink.getAttribute("data-id");
    products.forEach((product) => {
      let productId = product.getAttribute("id");
      if (linkData == productId) {
        product.classList.add("pt-space");
      } else {
        product.classList.remove("pt-space");
      }
    });
  });
});

function addSpaceAtTop() {
  let productArray = ["1"];
  products.forEach((product) => {
    if (window.pageYOffset >= product.offsetTop) {
      productArray.splice(0, 1, product);
    }
  });
  let last = productArray[0];
  last.classList.add("pt-space");
}

window.addEventListener("load", addSpaceAtTop);
