const productId = new URLSearchParams(window.location.search).get('id');
const productTitle = document.getElementById("product-title");
const productImage = document.getElementById("product-image");
const productDescription = document.getElementById("product-description");
const productPrice = document.getElementById("product-price");
const recommendations = document.getElementById("recommendations");

fetch(`https://fakestoreapi.com/products/${productId}`)
  .then(res => res.json())
  .then(product => {
    productTitle.textContent = product.title;
    productImage.src = product.image;
    productImage.style.width = '300px';
    productImage.style.height = '300px';
    productDescription.textContent = product.description;
    productPrice.textContent = (product.price * 83).toFixed(0);

    fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(product.category)}`)
      .then(res => res.json())
      .then(data => {
        recommendations.innerHTML = "";
        data.filter(p => p.id != product.id).slice(0, 4).forEach(p => {
          const div = document.createElement("div");
          div.className = "product";
          div.innerHTML = `
            <img src="${p.image}" alt="" style="width:150px;height:150px;">
            <h4>${p.title.substring(0, 25)}...</h4>
            <button onclick="location.href='product.html?id=${p.id}'">View</button>
          `;
          recommendations.appendChild(div);
        });
      });
  });
