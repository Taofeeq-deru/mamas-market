let orders = document.querySelectorAll(".view-order");
let uid = 0;

function showProducts(product) {
  uid++;

  let row = document.createElement("div");
  row.setAttribute("class", "form-row each-product");
  row.innerHTML = `
    <div class="form-group my-0 py-0 col-4">
      <!--prettier-ignore-->
      <input 
        type="text"
        name="product"
        id="product${uid}"
        class="form-control-plaintext product text-capitalize fa-input"
        value="${product.product}"
        disabled />
    </div>
    <div class="form-group my-0 py-0 col-4">
      <!--prettier-ignore-->
      <input 
        type="text"
        name="quantity"
        id="qtty${uid}"
        class="form-control-plaintext qtty text-capitalize fa-input"
        value="${product.qtty} ${product.unit}"
        disabled />
    </div>
    <div class="form-group my-0 py-0 col-4">
      <!--prettier-ignore-->
      <input 
        type="text"
        name="price"
        id="price${uid}"
        class="form-control-plaintext price text-capitalize fa-input"
        value="₦${product.price}"
        disabled />
    </div>
  `;

  document.getElementById("productsInfo").appendChild(row);
}

orders.forEach((order) => {
  order.addEventListener("click", function populateForm() {
    let orderData = JSON.parse(order.getAttribute("data-details"));
    let productsOrdered = orderData.products_ordered;
    let phoneNumber = `tel:${orderData.buyer_no}`;

    document.getElementById("order-date").value = orderData.order_date;

    let rows = document
      .getElementById("productsInfo")
      .querySelectorAll(".each-product");
    rows.forEach((row) => row.remove());

    productsOrdered.forEach((product) => showProducts(product));

    document.getElementById("buyer-no").value = orderData.buyer_no;
    document.getElementById("call-no").setAttribute("href", phoneNumber);
    document.getElementById("buyer-name").value = orderData.buyer_name;
    document.getElementById("address").value = orderData.delivery_address;

    if (orderData.paid == true) {
      document.getElementById("noPayment").classList.add("hide");
      document
        .getElementById("paymentInfo")
        .querySelector(".form-row")
        .classList.remove("hide");
      document.getElementById(
        "amount-paid"
      ).value = `₦${orderData.amount_paid}`;
      document.getElementById("payment-date").value = orderData.payment_date;
      document.getElementById("payment-ref").value = orderData.payment_ref;
    } else {
      document.getElementById("noPayment").classList.remove("hide");
      document
        .getElementById("paymentInfo")
        .querySelector(".form-row")
        .classList.add("hide");
    }

    if (orderData.paid == false && orderData.order_sent == false) {
      document.getElementById("buttons").classList.add("hide");
      document.getElementById("buyerInfo").classList.add("hide");
      document.getElementById("orderStatus").classList.add("hide");
    } else if (orderData.paid == true && orderData.order_sent == false) {
      document.getElementById("sent").disabled = false;
      document.getElementById("buttons").classList.remove("hide");
      document.getElementById("buyerInfo").classList.remove("hide");
      document.getElementById("orderStatus").classList.remove("hide");
      document.getElementById("delivery").classList.add("hide");
    } else if (orderData.paid == true && orderData.order_sent == true) {
      document.getElementById("sent").disabled = true;
      document.getElementById("buttons").classList.add("hide");
      document.getElementById("buyerInfo").classList.remove("hide");
      document.getElementById("orderStatus").classList.remove("hide");
      document.getElementById("delivery").classList.remove("hide");
    }

    document.getElementById("sent").checked = orderData.order_sent;
    if (orderData.order_sent == true) {
      document.getElementById("date-order-sent").classList.remove("hide");
      //document.getElementById("buttons").classList.add("hide");
      document.getElementById("sent-date").value = orderData.sent_date;
      //document.getElementById("sent").disabled = true;
      document.getElementById("sent-label").innerHTML = "sent";
      document.getElementById("sent-label").classList.add("font-weight-bold");
    } else {
      document.getElementById("date-order-sent").classList.add("hide");
      //document.getElementById("buttons").classList.remove("hide");
      //document.getElementById("sent").disabled = false;
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
