const buttonRight = document.getElementById("slideRight");
const buttonLeft = document.getElementById("slideLeft");

buttonRight.onclick = function () {
  document.getElementById("pills-tab").scrollLeft += 200;
};

buttonLeft.onclick = function () {
  document.getElementById("pills-tab").scrollLeft -= 200;
};

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
