// Selecting elements
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const productContainers = document.querySelectorAll('.product-container');
const numProducts = productContainers.length;

let currentIndex = 0;

// Function to show the current product with animation
function showProduct(index) {
  // Add transition property
  productContainers.forEach(container => {
    container.style.transition = 'transform 0.5s ease-in-out';
    container.style.transform = `translateX(-${index * 100}%)`; // Adjust position based on index
  });
}

// Event listener for previous button
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? numProducts - 1 : currentIndex - 1;
  showProduct(currentIndex);
});

// Event listener for next button
nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % numProducts;
  showProduct(currentIndex);
});

// Show the initial product
showProduct(currentIndex);

// Function to handle adding to cart
function addToCart() {
  const button = document.querySelector('.add-to-cart-button');
  button.classList.add('added-to-cart');

  // Reset animation after 0.5s
  setTimeout(() => {
    button.classList.remove('added-to-cart');
  }, 500);

  // Add your logic here to add the item to the cart
  // For now, we'll just display a message
  // alert('Added to cart!');
}
