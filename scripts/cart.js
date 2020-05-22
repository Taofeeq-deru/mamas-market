let cartTable = document.getElementById("cartTable");
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //console.log("shown");
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    calculateTotalPriceAndCost();
    document.getElementById("prevBtn").style.display = "none";
  } else if (n == 1) {
    showPromoCode();
    document.getElementById("nextBtn").innerHTML = "MAKE PAYMENT";
    document.getElementById("prevBtn").style.display = "inline";

    //validateAddress(disable);
  }
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  //if (n == 1 && !validateForm()) return false;
  if (n == 1 && currentTab == 1 && !validateAddress()) return false;
  console.log("valid address");
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab == x.length) {
    // ... the form gets submitted:
    document.getElementById("cartForm").submit();
    //console.log("submitted");
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
  //console.log("new tab");
}

// function validateForm() {
//   // This function deals with validation of the form fields
//   var x,
//     y,
//     i,
//     valid = true;
//   x = document.getElementsByClassName("tab");
//   y = x[currentTab].getElementsByTagName("input");
//   //z = x[currentTab].getElementById("selectAddress");
//   // A loop that checks every input field in the current tab:
//   for (i = 0; i < y.length; i++) {
//     // If a field is empty...
//     if (y[i].value == "" && y[i].classList.contains("required")) {
//       // add an "invalid" class to the field:
//       y[i].classList.add("invalid");
//       // and set the current valid status to false
//       //console.log("invalid");
//       valid = false;
//     }
//   }
//   return valid; // return the valid status
// }

function validateAddress() {
  let v = 0;
  let valid;
  let selectAddress = document.getElementById("selectAddress");
  let addressInputs = document.querySelectorAll(".required");

  console.log("checking");

  addressInputs.forEach((addressInput) => {
    if (addressInput.value == "") {
      v++;
      console.log("empty address");
    }
  });

  if (selectAddress.value == "" && v >= 3) {
    console.log("no address entered");
    document.getElementById("warningText").classList.remove("dont-show");
    document.getElementById("warningText").classList.add("now-show");
    valid = false;
  } else {
    valid = true;
    console.log("Address entered");
  }

  console.log("done checking");

  return valid;
}

function calculateTotalPriceAndCost() {
  let price = 0;
  let totalPrice = document.querySelector(".total-price");
  let totalCost = document.querySelector(".total-cost");
  let totalPrice1 = document.querySelector("#total-price2");
  let totalCost1 = document.querySelector("#total-cost2");
  let shippingFee = Number(document.querySelector(".shipping-fee").value);

  let productPrices = cartTable.querySelectorAll(".product-total");

  productPrices.forEach((productPrice) => {
    let eachPrice = Number(productPrice.value);
    price += eachPrice;
  });

  totalPrice.value = price;
  totalPrice1.value = price;

  totalCost.value = price + shippingFee;
  totalCost1.value = price + shippingFee;
}

function showPromoCode() {
  let promoCode = document.querySelector(".promo-code").value;
  document.querySelector("#promo-code2").value = promoCode;
}

const removeCartProduct = function (event) {
  let product =
    event.currentTarget.parentElement.parentElement.parentElement.parentElement;
  product.remove();

  calculateTotalPriceAndCost();
};

const decreaseQtty = function (event) {
  //prettier-ignore
  let qtty = Number(event.currentTarget.parentElement.querySelector(".quantity").value);

  if (qtty <= 1) return false;

  //prettier-ignore
  let perQtty = Number(event.currentTarget.parentElement.parentElement.parentElement.querySelector(".product-price").value);

  qtty--;
  let productTotalPrice = qtty * perQtty;

  //prettier-ignore
  event.currentTarget.parentElement.parentElement.parentElement.querySelector(".product-total").value = productTotalPrice;
  //prettier-ignore
  event.currentTarget.parentElement.querySelector(".quantity").value = qtty

  calculateTotalPriceAndCost();
};

const increaseQtty = function (event) {
  //prettier-ignore
  let qtty = Number(event.currentTarget.parentElement.querySelector(".quantity").value);

  //prettier-ignore
  let perQtty = Number(event.currentTarget.parentElement.parentElement.parentElement.querySelector(".product-price").value);

  qtty++;
  let productTotalPrice = qtty * perQtty;

  //prettier-ignore
  event.currentTarget.parentElement.parentElement.parentElement.querySelector(".product-total").value = productTotalPrice;
  //prettier-ignore
  event.currentTarget.parentElement.querySelector(".quantity").value = qtty

  calculateTotalPriceAndCost();
};
