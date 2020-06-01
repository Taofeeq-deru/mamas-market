const loadImage = function (event) {
  let imageBlock = document.getElementById("output");
  let imageChildren = imageBlock.querySelectorAll(".imageFile");
  imageChildren.forEach((imageChild) => imageChild.remove());
  let files = event.target.files;
  console.log(files[0]);
  let filesArr = Array.prototype.slice.call(files);
  let text = document.getElementById("imageText");
  filesArr.forEach((file) => {
    //file = files[i];
    console.log(file);
    let img = document.createElement("img");
    img.classList.add("imageFile", "mr-2", "mb-2", "rounded-lg", "border-grey");
    img.setAttribute("src", URL.createObjectURL(file));
    imageBlock.appendChild(img);
  });
  text.innerHTML = "Change Images";
};
