let itemList = [];

let shopper = [];

let showOutput = document.getElementById("showOutput");
let image = document.getElementById("output");
let text = document.getElementById("imageText");
let allDetails = document.getElementById("allDetails");
let summaryDetails = document.querySelectorAll(".eachDetail");
let paymentDetails = document.querySelectorAll(".paymentDetails");
let quotation = document.querySelector(".quotation");
let summaryImage = document.getElementById("uploadedImage");

let id = 2;
let uuid = 0;

let currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //console.log("shown");
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("nextBtn").innerHTML = "Continue";
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("deliveryMan").classList.remove("show-image");
    document.getElementById("deliveryMan").classList.add("hide-image");
  } else if (n == 1) {
    document.getElementById("nextBtn").innerHTML = "Next";
    document.getElementById("prevBtn").style.display = "inline";
    document.getElementById("deliveryMan").classList.remove("show-image");
    document.getElementById("deliveryMan").classList.add("hide-image");
  } else if (n == 2) {
    if (summaryImage.classList.contains("show-image")) {
      document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
      document.getElementById("nextBtn").innerHTML = "Make Payment";
    }

    document.getElementById("prevBtn").style.display = "inline";
    document.getElementById("deliveryMan").classList.remove("show-image");
    document.getElementById("deliveryMan").classList.add("hide-image");
    //show shopper details
    let selectedShopper = document.getElementById("selectedShopperDetails");
    //prettier-ignore
    selectedShopper.querySelector(".selected-shopper-no").innerHTML = `${shopper[shopper.length - 1].number}`;
    //prettier-ignore
    selectedShopper.querySelector(".selected-shopper-name").innerHTML = `${shopper[shopper.length - 1].name}`;
    //calculate
    calculatePrice();
  } else {
    //show prices
    document.getElementById("nextBtn").innerHTML = "Make Payment";
    document.getElementById("prevBtn").style.display = "inline";
    document.getElementById("nextBtn").classList.remove("btn-submit");
    document.getElementById("nextBtn").classList.add("btn-pay");
    document.getElementById("deliveryMan").classList.remove("hide-image");
    document.getElementById("deliveryMan").classList.add("show-image");
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(n) {
  console.log("next");
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && currentTab == 0 && !validateSelectShopFor()) {
    return false;
  } else if (n == 1 && currentTab == 0 && !validateAddOrUploadList()) {
    return false;
  } else if (n == 1 && currentTab == 0 && !validateSelectShopper()) {
    return false;
  } else if (n == 1 && currentTab == 1 && !validateAddress()) {
    return false;
  }

  if (
    n == 1 &&
    currentTab == 0 &&
    validateSelectShopper() &&
    validateAddOrUploadList() &&
    validateSelectShopper()
  ) {
    document.getElementsByClassName("step")[currentTab].classList.add("finish");
  }

  if (currentTab == 2) {
    document.getElementsByClassName("step")[currentTab].classList.add("finish");
  }

  //get data
  if (currentTab == 0) {
    let shopperList = document.getElementById("selectShopperList");
    let allShoppers = shopperList.querySelectorAll(".each-shopper");

    let fullList = document.getElementById("item-list");
    let allItems = fullList.querySelectorAll(".each-li");

    //empty the itemList array so as to update
    itemList.splice(0, itemList.length);
    //remove all products in product list so as to update
    let theProducts = document.querySelectorAll(".each-product");
    theProducts.forEach((theProduct) => theProduct.remove());

    allItems.forEach((eachItem) => saveItem(eachItem));
    allShoppers.forEach((eachShopper) => {
      if (eachShopper.querySelector(".shopper").checked) {
        saveShopper(eachShopper);
      }
    });

    //show item list
    itemList.forEach(showProducts);

    console.log(itemList, shopper, shopper[0].number);
  }
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form or user uploaded list...
  if (
    currentTab == x.length - 1 &&
    summaryImage.classList.contains("show-image")
  ) {
    // ... the form gets submitted:
    document.getElementById("orderForm").submit();
    //console.log("submitted");
    return false;
  } else if (currentTab >= x.length) {
    // ... the form gets submitted:
    document.getElementById("orderForm").submit();
    //console.log("submitted");
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
  //console.log("new tab");
}

function validateAddress() {
  let v = 0;
  let valid;
  let selectAddress = document.getElementById("selectAddress");
  let addressInputs = document.querySelectorAll(".reqAddress");

  //console.log("checking");

  addressInputs.forEach((addressInput) => {
    if (addressInput.value == "") {
      v++;
      //console.log("empty address");
    }
  });

  if (selectAddress.value == "" && v >= 3) {
    //console.log("no address entered");
    document.getElementById("warningText").classList.remove("dont-show");
    document.getElementById("warningText").classList.add("now-show");
    valid = false;
  } else {
    document.getElementById("warningText").classList.add("dont-show");
    document.getElementById("warningText").classList.remove("now-show");
    valid = true;
    //console.log("Address entered");
  }

  //console.log("done checking");
  if (valid) {
    //console.log("valid");
    document.getElementsByClassName("step")[currentTab].classList.add("finish");
  }

  return valid;
}

function validateSelectShopFor() {
  let v = 0;
  let valid;
  let otherCategory = document.getElementById("others");
  let checkboxes = document.querySelectorAll("input[type='checkbox']");

  //console.log("checking");

  checkboxes.forEach((checkbox) => {
    if (!checkbox.checked) {
      v++;
      //console.log("empty address");
    }
  });

  if (otherCategory.value == "" && v >= 3) {
    //console.log("no address entered");
    document.getElementById("chooseCategory").classList.remove("dont-show");
    document.getElementById("chooseCategory").classList.add("now-show");
    document.getElementById("mainHead").scrollIntoView();
    valid = false;
  } else {
    document.getElementById("chooseCategory").classList.add("dont-show");
    document.getElementById("chooseCategory").classList.remove("now-show");
    valid = true;
    //console.log("Address entered");
  }

  return valid;
}

function validateAddOrUploadList() {
  let v = 0;
  let valid;
  let listOfItems = document.querySelectorAll(".select-list");

  //console.log("checking");

  listOfItems.forEach((eachItemOnList) => {
    if (eachItemOnList.value == "") {
      v++;
      //console.log("empty address");
    }
  });

  if (showOutput.classList.contains("hide-image") && v >= listOfItems.length) {
    //console.log("no address entered");
    document.getElementById("addOrUploadList").classList.remove("dont-show");
    document.getElementById("addOrUploadList").classList.add("now-show");
    document.querySelector(".tab").scrollIntoView();
    valid = false;
  } else {
    document.getElementById("addOrUploadList").classList.add("dont-show");
    document.getElementById("addOrUploadList").classList.remove("now-show");
    valid = true;
    //console.log("Address entered");
  }

  return valid;
}

function validateSelectShopper() {
  let v = 0;
  let valid;
  let listOfShoppers = document.querySelectorAll(".shopper");

  //console.log("checking");

  listOfShoppers.forEach((eachShopperOnList) => {
    if (!eachShopperOnList.checked) {
      v++;
      //console.log("empty address");
    }
  });

  if (v >= listOfShoppers.length) {
    //console.log("no address entered");
    document.getElementById("clickShopper").classList.remove("text-muted");
    document.getElementById("clickShopper").classList.add("text-warning");
    document.getElementById("clickShopper").classList.remove("fa-xs");
    document.getElementById("clickShopper").classList.add("fa-sm");
    document.querySelector("#accordionList").scrollIntoView();
    valid = false;
  } else {
    document.getElementById("clickShopper").classList.add("text-muted");
    document.getElementById("clickShopper").classList.remove("text-warning");
    document.getElementById("clickShopper").classList.add("fa-xs");
    document.getElementById("clickShopper").classList.remove("fa-sm");
    valid = true;
    //console.log("Address entered");
  }

  return valid;
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].classList.remove("active");
  }
  //... and adds the "active" class on the current step:
  x[n].classList.add("active");
}

function saveItem(shopItem) {
  let item = {
    id: "",
    unit: "",
    weight: "",
    selectList: "",
    listPreference: "",
    amount: "",
  };

  item.id = `${shopItem.getAttribute("id")}`;
  item.unit = `${shopItem.querySelector(".unit").value}`;
  item.weight = shopItem.querySelector(".weight").value;
  item.selectList = `${shopItem.querySelector(".select-list").value}`;
  //prettier-ignore
  item.listPreference = `${shopItem.querySelector(".list-preference").value}`;
  item.amount = shopItem.querySelector(".product-amount").value;

  itemList.push(item);

  console.log(shopItem.querySelector(".unit").value);
}

function saveShopper(shopperDetails) {
  let shDet = { name: "", number: "" };

  //prettier-ignore
  shDet.name = `${shopperDetails.querySelector(".each-shopper-name").innerHTML}`;
  //prettier-ignore
  shDet.number = `${shopperDetails.querySelector(".shopper-no").innerHTML}`;

  shopper[0] = shDet;
}

function addMore() {
  id = id + 1;
  let ul = document.getElementById("item-list");
  let li = document.createElement("li");
  li.setAttribute("id", id);
  li.setAttribute("class", "each-li");
  li.innerHTML = `<div class="form-row bg-grey rounded-lg each-item pt-3 px-3 mb-3">
  <div class="form-group col-2">
    <div class="bg-white d-flex rounded-lg pr-2">
      <!--prettier-ignore-->
      <select name="unit${id}" id="unit${id}" class="form-control unit border-0 w-50 h-50 my-1">
        <option value="kg">kg</option>
        <option value="">.</option>
      </select>
      <!--prettier-ignore-->
      <input type="number" name="weight${id}" id="weight${id}" value="1" class="form-control weight bg-grey w-50 h-50 my-1" />
    </div>
  </div>
  <div class="form-group col-8">
    <!--prettier-ignore-->
    <select name="list${id}" id="list${id}" class="form-control select-list">
      <option value="">Select from the list (Click dropdown to see list)</option>
      <option value="">.</option>
      <option value="">..</option>
      <option value="">...</option>
    </select>
    <!--prettier-ignore-->
    <input type="text" name="product-preference${id}" id="product-preference${id}" class="form-control my-2 list-preference" placeholder="Do you have any preference? Kindly type it here" />
  </div>
  <div class="form-group col-2">
    <div class="d-flex">
      <i class="fa fa-naira mt-2 fa-lg"></i>
      <!--prettier-ignore-->
      <input type="text" name="product-amount${id}" id="product-amount${id}" class="form-control bg-white font-weight-bold text-center product-amount" placeholder="Amount" value="" readonly />
    </div>
    <p class="mt-4 text-center text-underline text-mama fa-xs remove-product" onclick="removeProduct(event)">Remove item</p>
  </div>
</div>`;
  ul.appendChild(li);
}

const removeProduct = function (event) {
  console.log("removing");
  let item = event.currentTarget.parentElement.parentElement.parentElement;
  item.remove();
  console.log("removed");
};

function showProducts(value) {
  uuid = uuid + 1;
  let productList = document.getElementById("allProductList");
  let eachProduct = document.createElement("li");
  eachProduct.setAttribute("class", "each-product");
  eachProduct.innerHTML = `<li class="each-product" data-index="${value.id}">
  <div class="form-row pb-3 pt-3 border-bottom-grey">
    <div class="form-group col-5 text-dark">
      <!--name of product-->
      <!--prettier-ignore-->
      <p class="fa-sm mt-2 mb-3 text-capitalize product-name">
        ${value.selectList}
      </p>
      <p class="fa-xs text-capitalize mb-0">
        description:
      </p>
      <!--preference description from user-->
      <!--prettier-ignore-->
      <p class="fa-order-xs text-muted mb-0 user-description">
        ${value.listPreference || "none"}
      </p>
    </div>
    <!--prettier-ignore-->
    <div class="form-group col-2 d-flex flex-row justify-content-around">
      <!--click to increase-->
      <!--prettier-ignore-->
      <p class="fa-lg text-decoration-none text-dark mt-2 subtract mr-n2" onclick="decreaseQty(event)">-</p>
      <!--product quantity-->
      <!--prettier-ignore-->
      <input type="text" name="quantity${uuid}" id="quantity${uuid}"
        class="form-control w-30 bg-white quantity mr-n1 border-right-0 rounded-left" 
        value="${value.weight}" disabled />
      <!--prettier-ignore-->
      <span class="product-weight text-dark pt-2 px-0 w-25 ml-n4 rounded-right border-left-0 form-control">
        ${value.unit}
      </span>
      <!--click to decrease-->
      <!--prettier-ignore-->
      <p class="fa-lg text-decoration-none text-dark ml-n3 mt-2 add" onclick="increaseQty(event)">+</p>
    </div>
    <!--prettier-ignore-->
    <div class="form-group col-3 d-flex flex-row justify-content-center">
      <!--product price-->
      <i class="fa fa-naira mt-2 fa-lg"></i>
      <!--prettier-ignore-->
      <input type="text" name="price${uuid}" id="price${uuid}"
        class="form-control w-50 bg-white price text-center"
        value="${value.amount}" disabled />
    </div>
    <!--prettier-ignore-->
    <div class="form-group col-2 d-flex flex-row justify-content-start">
      <!--click to remove product-->
      <!--prettier-ignore-->
      <p class="fa-xs text-decoration-none text-dark mt-2 remove" onclick="remove(event)">Remove</p>
    </div>
  </div>
</li>`;
  productList.appendChild(eachProduct);
}

function calculatePrice() {
  let subToTalPrice = 0;
  let subtotal = document.querySelector(".subtotal");
  let grandtotal = document.querySelector(".grand-total");
  let deliveryCost = Number(document.querySelector(".delivery-cost").value);
  let finalSubtotal = document.querySelector(".subtotal2");
  let finalGrandtotal = document.querySelector(".grand-total2");

  let allPrices = document.querySelectorAll(".price");
  //console.log(allPrices);
  allPrices.forEach((eachPrice) => {
    let productPrices = Number(eachPrice.value);
    subToTalPrice += productPrices;
  });

  //subtotal price
  subtotal.value = subToTalPrice;
  finalSubtotal.value = subToTalPrice;

  //grand price
  grandtotal.value = subToTalPrice + deliveryCost;
  finalGrandtotal.value = subToTalPrice + deliveryCost;
}

const decreaseQty = function (event) {
  //prettier-ignore
  let eventIndex = event.currentTarget.parentElement.parentElement.parentElement.getAttribute("data-index");
  //prettier-ignore
  let qtty = Number(event.currentTarget.parentElement.querySelector(".quantity").value);

  if (qtty <= 1) return false;

  //prettier-ignore
  let price = Number(event.currentTarget.parentElement.parentElement.querySelector(".price").value);

  let perQtty = price / qtty;
  qtty--;
  let newPrice = qtty * perQtty;

  //prettier-ignore
  event.currentTarget.parentElement.parentElement.querySelector(".price").value = newPrice;
  //prettier-ignore
  event.currentTarget.parentElement.querySelector(".quantity").value = qtty;

  let allItemsList = document.querySelectorAll(".each-li");

  allItemsList.forEach((eachItemList) => {
    let eachIndex = eachItemList.getAttribute("id");
    if (eventIndex == eachIndex) {
      eachItemList.querySelector(".weight").value = qtty;
      eachItemList.querySelector(".product-amount").value = newPrice;
    }
  });

  calculatePrice();
};

const increaseQty = function (event) {
  //prettier-ignore
  let eventIndex = event.currentTarget.parentElement.parentElement.parentElement.getAttribute("data-index");
  //prettier-ignore
  let qtty = Number(event.currentTarget.parentElement.querySelector(".quantity").value);
  //prettier-ignore
  let price = Number(event.currentTarget.parentElement.parentElement.querySelector(".price").value);

  let perQtty = price / qtty;
  qtty++;
  let newPrice = qtty * perQtty;

  //prettier-ignore
  event.currentTarget.parentElement.parentElement.querySelector(".price").value = newPrice;
  //prettier-ignore
  event.currentTarget.parentElement.querySelector(".quantity").value = qtty

  let allItemsList = document.querySelectorAll(".each-li");

  allItemsList.forEach((eachItemList) => {
    let eachIndex = eachItemList.getAttribute("id");
    if (eventIndex == eachIndex) {
      eachItemList.querySelector(".weight").value = qtty;
      eachItemList.querySelector(".product-amount").value = newPrice;
    }
  });

  calculatePrice();
};

const remove = function (event) {
  let product = event.currentTarget.parentElement.parentElement.parentElement;
  let index = product.getAttribute("data-index");
  let allItemsList = document.querySelectorAll(".each-li");
  product.remove();

  allItemsList.forEach((eachItemList) => {
    let eachIndex = eachItemList.getAttribute("id");
    if (index == eachIndex) {
      eachItemList.remove();
    }
  });

  calculatePrice();
};

const loadShopList = function (event) {
  showOutput.classList.remove("hide-image");
  showOutput.classList.add("show-image");
  image.src = URL.createObjectURL(event.target.files[0]);
  text.innerHTML = "Change Image";

  allDetails.classList.remove("bg-grey");
  //prettier-ignore
  paymentDetails.forEach((paymentDetails) => paymentDetails.classList.add("hide-image"));
  //prettier-ignore
  summaryDetails.forEach((summaryDetail) =>summaryDetail.classList.add("hide-image"));
  summaryImage.classList.remove("hide-image");
  summaryImage.classList.add("show-image");
  quotation.classList.remove("hide-image");
  quotation.classList.add("show-image");
  summaryImage.src = URL.createObjectURL(event.target.files[0]);
};

function deleteImage() {
  document.querySelector("input[type='file']").value = "";
  image.src = "";

  showOutput.classList.remove("show-image");
  showOutput.classList.add("hide-image");

  text.innerHTML = "Add New Image";

  allDetails.classList.add("bg-grey");
  //prettier-ignore
  paymentDetails.forEach((paymentDetails) => paymentDetails.classList.remove("hide-image"));
  //prettier-ignore
  summaryDetails.forEach((summaryDetail) =>summaryDetail.classList.remove("hide-image"));
  summaryImage.classList.remove("show-image");
  summaryImage.classList.add("hide-image");
  quotation.classList.remove("show-image");
  quotation.classList.add("hide-image");
  summaryImage.src = "";
}
