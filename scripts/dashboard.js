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

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let image_size = file.size;

      let min = 1024 * 25;
      let max = 1024 * 2014;

      if (image_size < min || image_size > max) {
        $(`#passport`).val("");
        alert(`Each image must be between 25KB and 2MB`);
        $(`.imageFile`).remove();
        $(`#product-image`).val("");
        break;
      }
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
    }
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

function emptyModalForm() {
  modalLabel.innerHTML = "add new product";

  document.getElementById("product-name").value = "";

  document.getElementById("price").value = "";

  document.getElementById("product-description").value = "";

  document.getElementById("item-no").value = "";

  let units = document.getElementById("unit").querySelectorAll("option");
  units.forEach((unit) => {
    unit.removeAttribute("selected");
  });

  let categories = document
    .getElementById("product-category")
    .querySelectorAll("option");
  categories.forEach((category) => {
    category.removeAttribute("selected");
  });

  let imageBlock = document.getElementById("output");
  let images = imageBlock.querySelectorAll("img");
  images.forEach((image) => image.remove());
}

edits.forEach((edit) => {
  edit.addEventListener("click", function populateModalForm() {
    modalLabel.innerHTML = "edit product";
    let productDetails = edit.getAttribute("data-product");
    let productData = JSON.parse(productDetails);

    document.getElementById("product-name").value = productData.name;

    document.getElementById("price").value = productData.price;

    document.getElementById("product-description").value =
      productData.description;

    document.getElementById("item-no").value = productData.stock;

    let units = document.getElementById("unit").querySelectorAll("option");
    units.forEach((unit) => {
      if (unit.value == productData.unit) {
        unit.setAttribute("selected", "true");
      }
    });

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
