let products = document.querySelectorAll(".tab-product");
let tabLinks = document.querySelectorAll(".tab-link");

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
