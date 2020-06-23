let head1 = document.getElementById("head1");
let head2 = document.getElementById("head2");
let head3 = document.getElementById("head3");

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

function myFunction() {
  head1.classList.add("active");
}

function head1Function() {
  head1.classList.add("active");
  head2.classList.remove("active");
  head3.classList.remove("active");
}

function head2Function() {
  head1.classList.remove("active");
  head2.classList.add("active");
  head3.classList.remove("active");
}

function head3Function() {
  head1.classList.remove("active");
  head2.classList.remove("active");
  head3.classList.add("active");
}

function goBack() {
  window.history.back();
}

window.addEventListener("load", myFunction);
head1.addEventListener("click", head1Function);
head2.addEventListener("click", head2Function);
head3.addEventListener("click", head3Function);
