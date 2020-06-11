const buttonRight = document.getElementById("slideRight");
const buttonLeft = document.getElementById("slideLeft");

let categories = document.getElementById("productCategories");
let catLinks = categories.querySelectorAll(".nav-link");
let merits = document.getElementById("merits");

buttonRight.onclick = function () {
  document.getElementById("pills-tab").scrollLeft += 200;
};

buttonLeft.onclick = function () {
  document.getElementById("pills-tab").scrollLeft -= 200;
};

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
catLinks.forEach((catLink) => catLink.addEventListener("click", goToTop));
