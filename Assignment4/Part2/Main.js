const displayedImg = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('.dark');
const overlay = document.querySelector('.overlay');

// List of images
const imageList = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];
const altText = {
  'pic1.jpg': 'Closeup of a blue human eye',
  'pic2.jpg': 'Rock that looks like a wave',
  'pic3.jpg': 'Purple and white flowers',
  'pic4.jpg': 'Ancient Egyptian wall painting',
  'pic5.jpg': 'Butterfly on a green leaf'
};

// Populate the thumbnail bar
imageList.forEach(image => {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', `images/${image}`);
  newImage.setAttribute('alt', altText[image]);
  thumbBar.appendChild(newImage);

  // Click event to change the displayed image
  newImage.addEventListener('click', () => {
    displayedImg.src = newImage.src;
    displayedImg.alt = newImage.alt;
  });
});

// Darken/Lighten functionality
btn.addEventListener('click', () => {
  if (btn.textContent === 'Darken') {
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    btn.textContent = 'Lighten';
  } else {
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    btn.textContent = 'Darken';
  }
});