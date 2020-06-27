const buttonRight = document.getElementById("slideRight");
const buttonLeft = document.getElementById("slideLeft");

let categories = document.getElementById("productCategories");
let catLinks = categories.querySelectorAll(".nav-link");

document.querySelectorAll(".picture").forEach(function (image) {
  let src = image.getAttribute("src");

  let img_replacement = document.createElement("div");
  img_replacement.src = src;
  // img_replacement.style.width = 250 + "px";
  // img_replacement.style.height = 250 + "px";
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

buttonRight.onclick = function () {
  document.getElementById("pills-tab").scrollLeft += 200;
};

buttonLeft.onclick = function () {
  document.getElementById("pills-tab").scrollLeft -= 200;
};

function showPopUp() {
  $("#popUpModal").modal("show");
}

function goToTop() {
  let categoryTop = document.querySelector(".homeProductList");
  categoryTop.scrollTop = 0;
}

function showAllTabContent() {
  let allTab = document.querySelector("#pills-all");
  let otherTabs = document.querySelectorAll(".pt-tab");
  let tabContents = "";

  otherTabs.forEach((otherTab) => {
    let tabProduce = otherTab.querySelectorAll(".produce");

    if (tabProduce.length == 0) return false;

    tabContents += otherTab.innerHTML;
  });

  allTab.innerHTML = tabContents;
}

window.addEventListener("load", showAllTabContent);
window.addEventListener("load", showPopUp);
catLinks.forEach((catLink) => catLink.addEventListener("click", goToTop));
