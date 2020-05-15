//this script is responsible for the change in colour of each tab in order page

let detailsTab = document.getElementById("pills-details-tab");
let detailsForm = document.getElementById("details-form");
let details = document.getElementById("pills-details");

let addressTab = document.getElementById("pills-address-tab");
let addressForm = document.getElementById("address-form");
let address = document.getElementById("pills-address");

let summaryTab = document.getElementById("pills-summary-tab");
let summaryForm = document.getElementById("summary-form");
let summary = document.getElementById("pills-summary");

let payTab = document.getElementById("pills-pay-tab");
let payForm = document.getElementById("pay-form");
let pay = document.getElementById("pills-pay");

function detailsFunction(e) {
  e.preventDefault();
  detailsTab.classList.remove("filling");
  details.classList.remove("show", "active");
  detailsTab.classList.add("filled");
  address.classList.add("show", "active");
  addressTab.classList.remove("text-dark");
  addressTab.classList.add("filling", "text-light");
  addressTab.focus();
}

function addressFunction(e) {
  e.preventDefault();
  addressTab.classList.remove("filling");
  address.classList.remove("show", "active");
  addressTab.classList.add("filled");
  summary.classList.add("show", "active");
  summaryTab.classList.remove("text-dark");
  summaryTab.classList.add("filling", "text-light");
  summaryTab.focus();
}

function summaryFunction(e) {
  e.preventDefault();
  summaryTab.classList.remove("filling");
  summary.classList.remove("show", "active");
  summaryTab.classList.add("filled");
  pay.classList.add("show", "active");
  payTab.classList.remove("text-dark");
  payTab.classList.add("filling", "text-light");
  payTab.focus();
}

detailsForm.addEventListener("submit", detailsFunction);
addressForm.addEventListener("submit", addressFunction);
summaryForm.addEventListener("submit", summaryFunction);
