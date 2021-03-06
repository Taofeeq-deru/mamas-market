var currentTab = 0; // Current tab is set to be the first tab (0)
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
    document.getElementById("nextBtn").innerHTML = "Submit";
    document.getElementById("prevBtn").style.display = "inline";
  } else {
    document.getElementById("nextBtn").style.display = "none";
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
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab == x.length - 1) {
    // ... the form gets submitted:
    document.getElementById("sellerRegForm").submit();
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
    z,
    s,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  z = x[currentTab].getElementsByTagName("textarea");
  s = x[currentTab].getElementsByTagName("select");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "" && y[i].classList.contains("required")) {
      // add an "invalid" class to the field:
      y[i].classList.add("invalid");
      y[i].setAttribute("placeholder", "*Please fill");
      // and set the current valid status to false
      //console.log("invalid");
      valid = false;
    } else {
      y[i].classList.remove("invalid");
      valid = true;
    }
  }
  // A loop that checks every textarea field in the current tab:
  for (i = 0; i < z.length; i++) {
    // If a field is empty...
    if (z[i].value == "") {
      // add an "invalid" class to the field:
      z[i].classList.add("invalid");
      z[i].setAttribute("placeholder", "*Please fill");
      // and set the current valid status to false
      //console.log("invalid");
      valid = false;
    } else {
      z[i].classList.remove("invalid");
      valid = true;
    }
  }
  // A loop that checks every select field in the current tab:
  for (i = 0; i < s.length; i++) {
    // If a field is empty...
    if (s[i].value == "") {
      // add an "invalid" class to the field:
      s[i].classList.add("invalid");
      //s[i].setAttribute("placeholder", "*Please fill");
      // and set the current valid status to false
      //console.log("invalid");
      valid = false;
    } else {
      s[i].classList.remove("invalid");
      valid = true;
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
