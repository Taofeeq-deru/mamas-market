let secondNav = document.getElementById("second-nav");
let logo = document.getElementById("second-nav-logo");

let sticky = secondNav.offsetTop;

function handleLogoDisplay() {
  if (window.pageYOffset >= sticky) {
    logo.classList.remove("hide-logo");
    logo.classList.add("show-logo");
  } else {
    logo.classList.remove("show-logo");
    logo.classList.add("hide-logo");
  }
}

window.addEventListener("scroll", handleLogoDisplay);
