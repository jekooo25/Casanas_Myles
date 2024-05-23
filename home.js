// Get references to the product image, description elements, and Featured Products text
const productImage = document.querySelector('.product-image');
const productInfo = document.querySelector('.product-info');
const productDescription = document.querySelector('.product-description');
const featuredProducts = document.querySelector('.left-side-text'); // Reference to Featured Products text
const glamourText = document.querySelector('.glamour-text'); // Reference to Glamour text
const cartOverlay = document.getElementById('cartOverlay');
const cartSummary = document.getElementById('cartSummary');
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Load from localStorage

// Define product data
const products = [
    {
        imageSrc: 'earrings1.jpg',
        description: 'Presenting our magnificent gold earrings, which are made from the best materials, carry enhancement and luxury. Every pair has eye-catching, simple designs but can elevate any look casually. Put on the purest gold on your ears with Mystic Treasure to step into ever-present beauty.'
    },
    {
        imageSrc: 'necklace1.jpg',
        description: 'Elevate your style with our exquisite pendant necklace. Featuring a delicate chain and a stunning, intricately detailed pendant, this timeless piece adds elegance to any outfit. Whether worn alone or layered, it complements any ensemble, making it a must-have in your jewelry collection. Embrace effortless glamour with our versatile pendant necklace.'
    },
    {
        imageSrc: 'bracelet1.jpg',
        description: 'Presenting our outstanding gold bracelet, lovingly made from the best materials to add an extra touch of class and elegance. Its shiny quality gently improves your style whether it\'s worn alone or stacked with other bracelets. Experience the charm of our superior gold bracelet right now.'
    },
    {
        imageSrc: 'watch1.jpg',
        description: 'Presenting our stunning gold watch, which has been carefully constructed with exceptional attention to detail. Its elegant design, which displays quality and sophistication, unquestionably gives a touch of luxuriousness to any attire. Mystic Treasure\'s classic elegance will instantly elevate your look.'
    }
];

// Set initial product index
let currentProductIndex = 0;

// Function to update the product display
function updateProduct() {
    const currentProduct = products[currentProductIndex];
    productImage.src = currentProduct.imageSrc;
    productDescription.textContent = currentProduct.description;
    productInfo.classList.remove('visible'); // Ensure the description is hidden initially
}

// Function to toggle glamour text visibility and animation
function toggleGlamourText() {
    glamourText.classList.toggle('hidden'); // Toggle visibility of glamour text
    if (glamourText.classList.contains('hidden')) {
        glamourText.style.opacity = '0'; // Set opacity to 0 when hidden
        glamourText.style.pointerEvents = 'none'; // Disable pointer events when hidden
    } else {
        glamourText.style.opacity = '1'; // Set opacity to 1 when visible
        glamourText.style.pointerEvents = 'auto'; // Enable pointer events when visible
    }
}

// Function to toggle Featured Products text visibility and animation
function toggleFeaturedProducts() {
    featuredProducts.classList.toggle('hidden'); // Toggle visibility of Featured Products text
    if (featuredProducts.classList.contains('hidden')) {
        featuredProducts.style.opacity = '0'; // Set opacity to 0 when hidden
        featuredProducts.style.pointerEvents = 'none'; // Disable pointer events when hidden
    } else {
        featuredProducts.style.opacity = '1'; // Set opacity to 1 when visible
        featuredProducts.style.pointerEvents = 'auto'; // Enable pointer events when visible
    }
}

// Make the glamour text visible by default
glamourText.classList.remove('hidden');

// Function to show product description
function showProductDescription() {
    productInfo.classList.add('visible'); // Show product info
}

// Function to hide product description
function hideProductDescription() {
    productInfo.classList.remove('visible'); // Hide product info
}

// Add click event listener to the product image for animation and fading glamour text
productImage.addEventListener('click', function() {
    productImage.classList.toggle('expand');
    toggleGlamourText(); // Toggle visibility and animation of glamour text
    toggleFeaturedProducts(); // Toggle visibility and animation of Featured Products text
    
    // Check if product image is expanded (moved to the right)
    if (productImage.classList.contains('expand')) {
        showProductDescription(); // Show product description
    } else {
        hideProductDescription(); // Hide product description
    }
});

// Get a reference to the navigation buttons
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Add event listeners to navigation buttons
prevBtn.addEventListener('click', function() {
    currentProductIndex = (currentProductIndex - 1 + products.length) % products.length;
    updateProduct();
    
    // Check if product image is expanded (moved to the right)
    if (productImage.classList.contains('expand')) {
        showProductDescription(); // Show product description
    } else {
        hideProductDescription(); // Hide product description
    }
});

nextBtn.addEventListener('click', function() {
    currentProductIndex = (currentProductIndex + 1) % products.length;
    updateProduct();
    
    // Check if product image is expanded (moved to the right)
    if (productImage.classList.contains('expand')) {
        showProductDescription(); // Show product description
    } else {
        hideProductDescription(); // Hide product description
    }
});

// Initialize the product display
updateProduct();

const images = ["igpost1.png", "igpost2.png", "igpost3.png"]; // List of images to cycle through
let currentImageIndex = 0;
const imgElements = Array.from(document.querySelectorAll(".igpost"));

function changeImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;

    // Update image source before animation starts
    imgElements.forEach((imgElement, index) => {
        imgElement.style.opacity = "0"; // Hide all images
        setTimeout(() => {
            imgElement.src = images[currentImageIndex]; // Update image source
            imgElement.style.opacity = "1"; // Show the new image
        }, 500); // Delay the image change to coincide with the transition
    });
}

// Change images every 4 seconds
setInterval(changeImage, 4000);

// Get reference to the "Add to Cart" button
const addToCartBtn = document.querySelector('.add-to-cart');

// Add event listener to the button
addToCartBtn.addEventListener('click', function() {
    // Redirect to the products page
    window.location.href = 'products.html'; // Replace 'products.html' with the actual URL of your products page
});

// JavaScript code for search functionality (if required)
document.querySelector('.search-btn').addEventListener('click', function() {
    // Get the search query from the input field
    var searchQuery = document.querySelector('input[type="text"]').value;
    
    // Perform search action based on the search query
    // Add your search functionality here
});

