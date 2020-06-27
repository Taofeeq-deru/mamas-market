let secondNav = document.getElementById("second-nav");
let logo = document.getElementById("second-nav-logo");

let sticky = secondNav.offsetTop;

const buttonRight = document.getElementById("slideShopperRight");
const buttonLeft = document.getElementById("slideShopperLeft");
const shopperList = document.querySelector(".shopper-overflow");

let shoppers = document.querySelectorAll(".sh-list");

let categories = document.getElementById("productCategories");
let catLinks = categories.querySelectorAll(".nav-link");
let merits = document.getElementById("merits");

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

function showPopUp() {
  $("#popUpModal").modal("show");
}

function handleRightButton() {
  if (shoppers.length > 3) {
    buttonRight.classList.remove("hide-slide-button");
    buttonRight.classList.add("show-slide-button");
    buttonLeft.classList.remove("hide-slide-button");
    buttonLeft.classList.add("show-slide-button");
  }
}

buttonRight.onclick = function () {
  shopperList.scrollLeft += 200;
};

buttonLeft.onclick = function () {
  shopperList.scrollLeft -= 200;
};

function handleLogoDisplay() {
  if (window.pageYOffset >= sticky) {
    logo.classList.remove("hide-logo");
    logo.classList.add("show-logo");
  } else {
    logo.classList.remove("show-logo");
    logo.classList.add("hide-logo");
  }
}

function goToTop() {
  merits.scrollIntoView();
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

window.addEventListener("load", handleRightButton);
window.addEventListener("scroll", handleLogoDisplay);
window.addEventListener("load", showAllTabContent);
window.addEventListener("load", showPopUp);
catLinks.forEach((catLink) => catLink.addEventListener("click", goToTop));
