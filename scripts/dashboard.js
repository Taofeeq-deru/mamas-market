let edits = document.querySelectorAll(".edit");
let modalLabel = document.getElementById("addFormLabel");
let addProduct = document.getElementById("addProduct");

let editted = "no";
let productSubmitURL;

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

const manageProduct = (event) => {
  event.preventDefault();

  let form = new FormData(event.target);

  let submitBtn = document.getElementById("submit-add-product-form");
  let originalBtnText = submitBtn.innerHTML;

  $(submitBtn).html(Spinner).attr("disabled", true);
  $(`#form-errors`).html("").addClass("d-none");

  if (productSubmitURL.trim() != "") {
    form.append("_method", "patch");
  }

  axios
    .post(productSubmitURL, form)
    .then((res) => {
      window.location.reload(true);
    })
    .catch((err) => {
      $(submitBtn).html(originalBtnText).attr("disabled", false);
      let error;
      if (err.response.status === 422) {
        error = "<ul>";
        $.each(err.response.data.errors, (i, v) => {
          error += `<li> ${v[0]} </li>`;
        });
      } else {
        error = err.response.data.message || err.toString();
      }
      $(`#form-errors`).html(error).removeClass("d-none");
      let errorPlaceholder = document.getElementById("form-errors");
      errorPlaceholder.scrollIntoView();
    });
};

function emptyModalForm() {
  modalLabel.innerHTML = "add new product";

  document.getElementById("product-name").value = "";

  document.getElementById("price").value = "";

  document.getElementById("product-description").value = "";

  document.getElementById("item-no").value = "";

  let units = document.getElementById("unit").querySelectorAll("option");
  units.forEach((unit) => {
    unit.selected = false;
  });

  let categories = document
    .getElementById("product-category")
    .querySelectorAll("option");
  categories.forEach((category) => {
    category.selected = false;
  });

  let imageBlock = document.getElementById("output");
  let images = imageBlock.querySelectorAll("img");
  images.forEach((image) => image.remove());

  let text = document.getElementById("imageText");
  text.innerHTML = "Click to upload images";
}

edits.forEach((edit) => {
  edit.addEventListener("click", function populateModalForm() {
    modalLabel.innerHTML = "edit product";
    let productDetails = edit.getAttribute("data-product");
    let productData = JSON.parse(productDetails);

    //productSubmitURL = ProductBaseURL + "/" + productData.slug;

    document.getElementById("product-name").value = productData.name;

    document.getElementById("price").value = productData.price;

    document.getElementById("product-description").value =
      productData.description;

    document.getElementById("item-no").value = productData.in_stock;

    let units = document.getElementById("unit").querySelectorAll("option");
    units.forEach((unit) => {
      if (unit.value == productData.stock_unit) {
        unit.selected = true;
      } else {
        unit.selected = false;
      }
    });

    document.getElementById("display").checked = productData.should_display;

    let categories = document
      .getElementById("product-category")
      .querySelectorAll("option");
    let dataCategories = productData.categories;

    categories.forEach((category) => {
      category.selected = false;
    });

    dataCategories.forEach((dataCategory) => {
      categories.forEach((category) => {
        if (category.value == dataCategory.id) {
          category.selected = true;
        }
      });
    });

    let imageArray = productData.images;

    editted = "yes";

    loadImage(imageArray);
  });
});

addProduct.addEventListener("click", () => {
  productSubmitURL = "";
  emptyModalForm();
});

function deleteProduct(id) {
  let c = confirm("Please confirm that you want to delete this product");
  if (!c) return;

  axios
    .delete(ProductBaseURL + "/" + id)
    .then(() => {
      window.location.reload(true);
    })
    .catch((err) => {
      alert("An error was encountered.");
      console.error(err);
    });
}
