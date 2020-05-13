const buttonRight = document.getElementById("slideRight");
const buttonLeft = document.getElementById("slideLeft");

buttonRight.onclick = function () {
  document.getElementById("pills-tab").scrollLeft += 200;
};

buttonLeft.onclick = function () {
  document.getElementById("pills-tab").scrollLeft -= 200;
};
