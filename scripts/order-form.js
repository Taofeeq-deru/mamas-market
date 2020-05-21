let itemList = [];

let shopper = [];

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
  } else if (n == 1) {
    document.getElementById("nextBtn").innerHTML = "Next";
    document.getElementById("prevBtn").style.display = "inline";
  } else if (n == 2) {
    document.getElementById("nextBtn").innerHTML = "Make Payment";
    document.getElementById("prevBtn").style.display = "inline";
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
    document.getElementById("prevBtn").style.display = "none";
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
  if (n == 1 && !validateForm()) return false;
  //get data
  if (currentTab == 0) {
    let shopperList = document.getElementById("selectShopperList");
    let allShoppers = shopperList.querySelectorAll(".each-shopper");

    let fullList = document.getElementById("item-list");
    let allItems = fullList.querySelectorAll(".each-li");

    //empty the itemList array so as to update
    itemList.splice(0, itemList.length);
    //remove all products in prouct list so as to update
    let theProducts = document.querySelectorAll(".each-product");
    theProducts.forEach((theProduct) => theProduct.remove());

    allItems.forEach((eachItem) => saveItem(eachItem));
    allShoppers.forEach((eachShopper) => {
      if (eachShopper.querySelector('input[name="shopper"]').checked) {
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
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    document.getElementById("orderForm").submit();
    //console.log("submitted");
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
  //console.log("new tab");
}

function validateForm() {
  // This function deals with validation of the form fields
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "" && y[i].classList.contains("required")) {
      // add an "invalid" class to the field:
      y[i].classList.add("invalid");
      // and set the current valid status to false
      //console.log("invalid");
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    //console.log("valid");
    document.getElementsByClassName("step")[currentTab].classList.add("finish");
  }
  return valid; // return the valid status
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
    unit: "",
    weight: "",
    selectList: "",
    listPreference: "",
    amount: "",
  };

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
  eachProduct.innerHTML = `<li class="each-product">
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
  event.currentTarget.parentElement.querySelector(".quantity").value = qtty

  calculatePrice();
};

const increaseQty = function (event) {
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

  calculatePrice();
};

const remove = function (event) {
  let product = event.currentTarget.parentElement.parentElement.parentElement;
  product.remove();

  calculatePrice();
};

const loadShopList = function (event) {
  let image = document.getElementById("output");
  let text = document.getElementById("imageText");
  image.classList.remove("hide-image");
  image.classList.add("show-image");
  image.src = URL.createObjectURL(event.target.files[0]);
  text.innerHTML = "Change Image";

  let summaryImage = document.getElementById("uploadedImage");
  let summaryDetails = document.getElementById("allDetails");
  let paymentDetails = document.querySelectorAll(".paymentDetails");

  //prettier-ignore
  paymentDetails.forEach((paymentDetails) => paymentDetails.classList.add("hide-image"));
  summaryDetails.classList.add("hide-image");
  summaryImage.classList.remove("hide-image");
  summaryImage.classList.add("show-image");
  summaryImage.src = URL.createObjectURL(event.target.files[0]);
};
