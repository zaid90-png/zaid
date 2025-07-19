const productList = document.getElementById("product-list");
const cartDisplay = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

let allProducts = [], cart = [];

fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    displayProducts();
  });

function displayProducts() {
  productList.innerHTML = "";
  allProducts.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="">
      <h3>${product.title}</h3>
      <p>₹${(product.price * 83).toFixed(0)}</p>
      <button class="add-btn">Add to Cart</button>
      <button class="details-btn">View Details</button>
    `;
    div.querySelector(".add-btn").onclick = () => addToCart(product);
    div.querySelector(".details-btn").onclick = () => {
      window.location.href = `product.html?id=${product.id}`;
    };
    productList.appendChild(div);
  });
}

function addToCart(product) {
  cart.push(product);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    const price = item.price * 83;
    total += price;
    const li = document.createElement("li");
    li.textContent = `${item.title} - ₹${price.toFixed(0)}`;
    const btn = document.createElement("button");
    btn.textContent = "Remove";
    btn.onclick = () => {
      cart.splice(index, 1);
      updateCart();
    };
    li.appendChild(btn);
    cartItems.appendChild(li);
  });
  totalPrice.textContent = total.toFixed(0);
  cartDisplay.textContent = `Cart (${cart.length}) - ₹${total.toFixed(0)}`;
}

