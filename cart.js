const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      const price = item.price * 83;
      total += price;

      li.innerHTML = `
        ${item.title} - ₹${price.toFixed(0)}
        <button onclick="removeItem(${index})">Remove</button>
      `;
      cartItems.appendChild(li);
    });
  }

  totalPrice.textContent = total.toFixed(0);
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

updateCart();
