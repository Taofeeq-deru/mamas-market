let orders = document.querySelectorAll(".view-order");

function populateTable() {
  orders.forEach((order) => {
    let orderDetails = JSON.parse(order.getAttribute("data-details"));
    order.parentElement.querySelector(".table-date").innerHTML =
      orderDetails.order_date;

    if (orderDetails.order_sent == true) {
      order.parentElement.querySelector(
        ".table-sent-status"
      ).innerHTML = `<i class="far fa-check-circle text-success"></i>`;
    } else {
      order.parentElement.querySelector(
        ".table-sent-status"
      ).innerHTML = `<i class="far fa-times-circle text-danger"></i>`;
    }

    if (orderDetails.order_delivered == true) {
      order.parentElement.querySelector(
        ".table-delivery-status"
      ).innerHTML = `<i class="far fa-check-circle text-success"></i>`;
    } else {
      order.parentElement.querySelector(
        ".table-delivery-status"
      ).innerHTML = `<i class="far fa-times-circle text-danger"></i>`;
    }
  });
}

orders.forEach((order) => {
  order.addEventListener("click", function populateForm() {
    let orderData = JSON.parse(order.getAttribute("data-details"));
    let phoneNumber = `tel:${orderData.buyer_no}`;

    document.getElementById("product").value = orderData.product;
    document.getElementById("order-date").value = orderData.order_date;

    document.getElementById(
      "quantity"
    ).value = `${orderData.quantity} ${orderData.unit}`;
    document.getElementById("price").value = `₦${orderData.price}`;

    document.getElementById("buyer-no").value = orderData.buyer_no;
    document.getElementById("call-no").setAttribute("href", phoneNumber);
    document.getElementById("buyer-name").value = orderData.buyer_name;
    document.getElementById("address").value = orderData.delivery_address;

    document.getElementById("sent").checked = orderData.order_sent;
    if (orderData.order_sent == true) {
      document.getElementById("date-order-sent").classList.remove("hide");
      document.getElementById("buttons").classList.add("hide");
      document.getElementById("sent-date").value = orderData.sent_date;
      document.getElementById("sent").disabled = true;
      document.getElementById("sent-label").innerHTML = "sent";
      document.getElementById("sent-label").classList.add("font-weight-bold");
    } else {
      document.getElementById("date-order-sent").classList.add("hide");
      document.getElementById("buttons").classList.remove("hide");
      document.getElementById("sent").disabled = false;
      document.getElementById("sent-label").innerHTML = "send";
      document
        .getElementById("sent-label")
        .classList.remove("font-weight-bold");
    }

    if (orderData.order_delivered == true) {
      document.getElementById("delivery-status").value = "delivered";
      document.getElementById("date-delivered").classList.remove("hide");
      document.getElementById("delivery-date").value = orderData.delivery_date;
    } else {
      document.getElementById("delivery-status").value = "not delivered";
      document.getElementById("date-delivered").classList.add("hide");
    }
  });
});

window.addEventListener("load", populateTable);
