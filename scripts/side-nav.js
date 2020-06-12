let sideNav = document.getElementById("mySidenav");
let navLinks = sideNav.querySelectorAll(".nav-link");

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

navLinks.forEach((navLink) => navLink.addEventListener("click", closeNav));
document.getElementById("content").addEventListener("click", closeNav);
