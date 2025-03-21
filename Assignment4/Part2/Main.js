// Selecting key elements from the document
const displayedImg = document.querySelector('.displayed-img'); // Main displayed image
const thumbBar = document.querySelector('.thumb-bar'); // Thumbnail container
const btn = document.querySelector('.dark'); // Darken/Lighten button
const overlay = document.querySelector('.overlay'); // Overlay effect div

// List of images and their corresponding alternative text descriptions
const imageList = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];
const altText = {
  'pic1.jpg': 'Closeup of a blue human eye',
  'pic2.jpg': 'Rock that looks like a wave',
  'pic3.jpg': 'Purple and white flowers',
  'pic4.jpg': 'Ancient Egyptian wall painting',
  'pic5.jpg': 'Butterfly on a green leaf'
};

// Populate the thumbnail bar with images and alt text
imageList.forEach(image => {
  const newImage = document.createElement('img'); // Create an img element
  newImage.setAttribute('src', `images/${image}`); // Set the image source
  newImage.setAttribute('alt', altText[image]); // Set the alt text
  thumbBar.appendChild(newImage); // Add the image to the thumbnail bar

  // Event listener to change the displayed image when a thumbnail is clicked
  newImage.addEventListener('click', () => {
    displayedImg.src = newImage.src; // Update the main image source
    displayedImg.alt = newImage.alt; // Update the main image alt text
  });
});

// Darken/Lighten button functionality
btn.addEventListener('click', () => {
  if (btn.textContent === 'Darken') {
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)'; // Apply dark overlay
    btn.textContent = 'Lighten'; // Change button text
  } else {
    overlay.style.backgroundColor = 'rgba(0,0,0,0)'; // Remove overlay effect
    btn.textContent = 'Darken'; // Change button text back
  }
});
