const loadImage = function (event) {
  let image = document.getElementById("output");
  let text = document.getElementById("imageText");
  image.style.display = "flex";
  image.src = URL.createObjectURL(event.target.files[0]);
  text.innerHTML = "Change Image";
};
