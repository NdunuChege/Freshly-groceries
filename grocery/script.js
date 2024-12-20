// Elements Selection
let searchForm = document.querySelector('.search-form');
let shoppingCart = document.querySelector('.shopping-cart');
let loginForm = document.querySelector('.login-form');
let navbar = document.querySelector('.navbar');
let productsContainer = document.querySelector('.products .product-slider');

// Search Form Toggle
document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

// Shopping Cart Toggle
document.querySelector('#cart-btn').onclick = () => {
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

// Login Form Toggle
document.querySelector('#login-btn').onclick = () => {
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    navbar.classList.remove('active');
}

// Navbar Toggle
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
}

// Close all active forms on scroll
window.onscroll = () => {
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

// Fetching grocery data and displaying products dynamically
fetch('http://localhost:3000/groceries')
    .then(response => response.json())
    .then(data => {
        let groceries = data.groceries;
        productsContainer.innerHTML = groceries.map(grocery => `
            <div class="box">
                <img src="/images/${grocery.name.toLowerCase().replace(/ /g, "_")}.jpeg" alt="${grocery.name}-image">
                <h3>${grocery.name}</h3>
                <div class="price">ksh ${grocery.price}</div>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i> 
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
                <a href="#" class="btn add-to-cart" data-id="${grocery.id}">add to cart</a>
            </div>
        `).join('');
    });

// Login Functionality
document.querySelector('.login-form').onsubmit = (e) => {
    e.preventDefault();
    let email = document.querySelector('.login-form input[type="email"]').value;
    let password = document.querySelector('.login-form input[type="password"]').value;

    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(data => {
            let users = data.users;
            let user = users.find(u => u.email === email && u.password === password);
            if (user) {
                alert(`Welcome, ${user.email}`);
                loginForm.classList.remove('active');
            } else {
                alert('Invalid email or password');
            }
        });
}

// Add to Cart Functionality
productsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        let id = e.target.dataset.id;
        fetch('http://localhost:3000/groceries')
            .then(response => response.json())
            .then(data => {
                let product = data.groceries.find(g => g.id === id);
                let cart = document.querySelector('.shopping-cart');
                let newItem = document.createElement('div');
                newItem.className = 'box';
                newItem.innerHTML = `
                    <i class="fas fa-trash"></i>
                    <img src="/images/${product.name.toLowerCase().replace(/ /g, "_")}.jpeg" alt="${product.name}-image">
                    <div class="content">
                        <h3>${product.name}</h3>
                        <span class="price">ksh${product.price}</span>
                        <span class="quantity">qty: ${product.quantity}</span>
                        <span class="origin">${product.origin}</span>
                    </div>
                `;
                cart.appendChild(newItem);
            });
    }
});
