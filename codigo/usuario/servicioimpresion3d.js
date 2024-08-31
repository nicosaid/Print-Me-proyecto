// Get the product card container
const cardContainer = document.querySelector('.card');

// Update the product card content
function updateProductCard(data) {
  // Update the image
  cardContainer.querySelector('img').src = data.image;

  // Update the title
  cardContainer.querySelector('h1').textContent = data.title;

  // Update the price
  cardContainer.querySelector('.price').textContent = data.price;

  // Update the description
  cardContainer.querySelector('p').textContent = data.description;
}

// Call the update function with new data
updateProductCard({
  image: 'new-image.jpg',
  title: 'New Product Title',
  price: '$29.99',
  description: 'New product description'
});

//fetchea data de la api
$.ajax({
    url: '/api/products',
    method: 'GET',
    success: function(data) {
      updateProductCard(data);
    }
  });