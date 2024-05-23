// Cart Functionality
const cartOverlay = document.getElementById('cartOverlay');
const cartSummary = document.getElementById('cartSummary');
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Event Listeners
document.querySelector('.cart-link').addEventListener('click', openCart);
cartOverlay.addEventListener('click', (event) => {
    if (event.target === cartOverlay) {
        closeCart();
    }
});

function openCart(event) {
    event.preventDefault();
    cartOverlay.style.width = '300px';
    updateCartSummary();
}

function closeCart() {
    cartOverlay.style.width = '0';
}

// Add to Cart Logic
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productContainer = button.closest('.product-container');
        const product = {
            title: productContainer.querySelector('.product-title').textContent,
            price: parseFloat(productContainer.querySelector('.product-price').textContent.replace('Php ', '').replace(',', '')),
            image: productContainer.querySelector('.product-image').src,
            quantity: parseInt(productContainer.querySelector('.quantity-input').value),
        };

        const existingItemIndex = cartItems.findIndex(item => item.title === product.title);
        if (existingItemIndex > -1) {
            cartItems[existingItemIndex].quantity += product.quantity;
        } else {
            cartItems.push(product);
        }

        updateCartSummary();
        saveCartToLocalStorage();
        openCart();
    });
});

// Update Cart Summary
function updateCartSummary() {
    cartSummary.innerHTML = '';
    let total = 0;

    cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItemElement = `
            <div class="cart-item" data-index="${index}">
                <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" data-action="decrease" data-index="${index}">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" data-action="increase" data-index="${index}">+</button>
                    </div>
                    <span class="cart-item-price">Php ${formatPrice(itemTotal)}</span>
                </div>
            </div>
        `;
        cartSummary.innerHTML += cartItemElement;
    });

    if (cartItems.length > 0) {
        const totalCheckoutDiv = `
            <div class="cart-total-checkout">
                <div class="cart-total">Total: Php ${formatPrice(total)}</div>
                <button class="checkout-button">Checkout</button>
            </div>
        `;
        cartSummary.innerHTML += totalCheckoutDiv;

        // Checkout button event listener
        cartSummary.querySelector('.checkout-button').addEventListener('click', () => {
            window.location.href = 'payment.html';
        });
    }

    // Quantity button event listeners (using event delegation)
    cartSummary.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.dataset.index);
            const action = button.dataset.action;

            if (action === 'increase') {
                cartItems[index].quantity++;
            } else if (action === 'decrease' && cartItems[index].quantity > 1) {
                cartItems[index].quantity--;
            } else if (action === 'decrease' && cartItems[index].quantity === 1) {
                cartItems.splice(index, 1);
            }

            updateCartSummary();
            saveCartToLocalStorage();
        });
    });
}
// Helper function to format price
function formatPrice(price) {
    return price.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });
}

// Local Storage Functions
function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function loadCartFromLocalStorage() {
    cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    updateCartSummary();
}

// Load cart on page load
loadCartFromLocalStorage();
