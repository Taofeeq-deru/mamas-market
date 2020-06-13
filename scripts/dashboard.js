let edits = document.querySelectorAll(".edit");
let modalLabel = document.getElementById("addFormLabel");
let addProduct = document.getElementById("addProduct");

let editted = "no";

const loadImage = function (event) {
  let imageBlock = document.getElementById("output");
  let imageChildren = imageBlock.querySelectorAll(".imageFile");
  imageChildren.forEach((imageChild) => imageChild.remove());
  let text = document.getElementById("imageText");
  if (editted === "no") {
    let files = event.target.files;
    //console.log(files[0]);
    let filesArr = Array.prototype.slice.call(files);
    filesArr.forEach((file) => {
      //file = files[i];
      //console.log(file);
      let img = document.createElement("img");
      img.classList.add(
        "imageFile",
        "mr-2",
        "mb-2",
        "rounded-lg",
        "border-grey"
      );
      img.setAttribute("src", URL.createObjectURL(file));
      imageBlock.appendChild(img);
    });
  } else {
    let files = event;
    //console.log(files);
    files.forEach((file) => {
      //console.log(file);
      let img = document.createElement("img");
      img.classList.add(
        "imageFile",
        "mr-2",
        "mb-2",
        "rounded-lg",
        "border-grey"
      );
      img.setAttribute("src", file);
      imageBlock.appendChild(img);
    });
  }
  text.innerHTML = "Change Images";
  editted = "no";
};

// function populateModalForm() {
// }

function emptyModalForm() {
  modalLabel.innerHTML = "add new product";
  document.getElementById("product-name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("product-description").value = "";
  document.getElementById("item-no").value = "";
  let categories = document
    .getElementById("product-category")
    .querySelectorAll("option");
  categories.forEach((category) => {
    category.removeAttribute("selected");
  });

  let imageArray = [];

  editted = "yes";

  loadImage(imageArray);
}

edits.forEach((edit) => {
  edit.addEventListener("click", function populateModalForm() {
    modalLabel.innerHTML = "edit product";
    let productDetails = edit.getAttribute("data-product");
    let productData = JSON.parse(productDetails);
    //console.log(productData.name);
    document.getElementById("product-name").value = productData.name;
    document.getElementById("price").value = productData.price;
    document.getElementById("product-description").value =
      productData.description;
    document.getElementById("item-no").value = productData.stock;
    let categories = document
      .getElementById("product-category")
      .querySelectorAll("option");
    let dataCategories = productData.categories;
    dataCategories.forEach((dataCategory) => {
      categories.forEach((category) => {
        if (category.value == dataCategory) {
          category.setAttribute("selected", "true");
        }
      });
    });

    let imageArray = productData.images;

    editted = "yes";

    loadImage(imageArray);
  });
});

addProduct.addEventListener("click", emptyModalForm);
