let sideBar = document.getElementById("sideBar");
let sideBarTexts = sideBar.querySelectorAll(".sidebar-text");

function toggleReduce() {
  sideBar.classList.toggle("reduce");

  if (sideBar.classList.contains("reduce")) {
    sideBarTexts.forEach((sideBarText) => {
      sideBarText.classList.add("hide");
    });

    sideBar.querySelector(".reduceExpand").classList.remove("fa-angle-left");
    sideBar.querySelector(".reduceExpand").classList.add("fa-angle-right");
  } else {
    sideBarTexts.forEach((sideBarText) => {
      sideBarText.classList.remove("hide");
    });

    sideBar.querySelector(".reduceExpand").classList.remove("fa-angle-right");
    sideBar.querySelector(".reduceExpand").classList.add("fa-angle-left");
  }
}

function expandSide() {
  sideBar.style.width = "15em";
}
