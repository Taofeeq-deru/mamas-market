const buttonRight = document.getElementById("slideRight");
const buttonLeft = document.getElementById("slideLeft");

let secondNav = document.getElementById("second-nav");

let sticky = secondNav.offsetTop;

buttonRight.onclick = function () {
  document.getElementById("pills-tab").scrollLeft += 200;
};

buttonLeft.onclick = function () {
  document.getElementById("pills-tab").scrollLeft -= 200;
};

function handleStickyNav() {
  if (window.pageYOffset >= sticky) {
    secondNav.classList.add("sticky-top-nav");
  } else {
    secondNav.classList.remove("sticky-top-nav");
  }
}

window.addEventListener("scroll", handleStickyNav);
