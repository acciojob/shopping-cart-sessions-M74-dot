// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Helper function to get cart from session storage
function getCart() {
  const cart = sessionStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

// Helper function to save cart to session storage
function saveCart(cart) {
  sessionStorage.setItem('cart', JSON.stringify(cart));
}

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = ''; // Clear the cart list before rendering
  const cart = getCart();

  if (cart.length === 0) {
    cartList.innerHTML = '<li>Your cart is empty</li>';
  } else {
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `${item.name} - $${item.price} x ${item.quantity} <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
      cartList.appendChild(li);
    });
  }
}

// Add item to cart
function addToCart(productId) {
  const cart = getCart();
  const product = products.find((p) => p.id === productId);
  const cartItem = cart.find((item) => item.id === productId);

  if (cartItem) {
    // If the product is already in the cart, increase the quantity
    cartItem.quantity += 1;
  } else {
    // Otherwise, add a new item to the cart
    cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
  }

  saveCart(cart);
  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== productId);

  saveCart(cart);
  renderCart();
}

// Clear cart
function clearCart() {
  sessionStorage.removeItem('cart');
  renderCart();
}

// Initial render
renderProducts();
renderCart();

// Event listeners
productList.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-cart-btn')) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    addToCart(productId);
  }
});

cartList.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-from-cart-btn')) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    removeFromCart(productId);
  }
});

clearCartBtn.addEventListener('click', clearCart);

window.onload = function() {
  renderCart();
};