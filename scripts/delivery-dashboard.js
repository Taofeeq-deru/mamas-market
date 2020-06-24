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

    document.getElementById("delivered").checked = orderData.order_delivered;
    if (orderData.order_delivered == true) {
      document.getElementById("date-delivered").classList.remove("hide");
      document.getElementById("buttons").classList.add("hide");
      document.getElementById("delivery-date").value = orderData.delivery_date;
      document.getElementById("delivered").disabled = true;
      document.getElementById("delivered-label").innerHTML = "delivered";
      document
        .getElementById("delivered-label")
        .classList.add("font-weight-bold");
    } else {
      document.getElementById("date-delivered").classList.add("hide");
      document.getElementById("buttons").classList.remove("hide");
      document.getElementById("delivered").disabled = false;
      document.getElementById("delivered-label").innerHTML = "deliver";
      document
        .getElementById("delivered-label")
        .classList.remove("font-weight-bold");
    }
  });
});
