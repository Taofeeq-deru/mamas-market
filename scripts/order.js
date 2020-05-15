const buttonRight = document.getElementById("slideShopperRight");
const buttonLeft = document.getElementById("slideShopperLeft");
const selectList = document.getElementById("selectList");

let shoppers = document.querySelectorAll(".each-shopper");

function handleRightButton() {
  if (shoppers.length > 4) {
    buttonRight.classList.remove("hide-slide-button");
    buttonRight.classList.add("show-slide-button");
    buttonLeft.classList.remove("hide-slide-button");
    buttonLeft.classList.add("show-slide-button");
  }
}

buttonRight.onclick = function () {
  selectList.scrollLeft += 200;
};

buttonLeft.onclick = function () {
  selectList.scrollLeft -= 200;
};

function goBack() {
  window.history.back();
}

window.addEventListener("load", handleRightButton);
