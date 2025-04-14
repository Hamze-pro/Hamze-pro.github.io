//Name: Djama Kayad, Hamze
//File: main.js
//Date: 11 April 2025
//Description:fictional nature site displaying a "factual" article about bears. As it stands, 
  it has a number of accessibility issues —
  exploring the existing site to fix them to the best of my ability.

// functionality for showing/hiding the comments section

// Get the show/hide button element
const showHideBtn = document.querySelector('.show-hide');
// Get the wrapper that contains the comments
const commentWrapper = document.querySelector('.comment-wrapper');

// Initially hide the comments section
commentWrapper.style.display = 'none';

// When the show/hide button is clicked, toggle the comments section
showHideBtn.onclick = function() {
  triggerComments();
};

// Also allow toggling with keyboard (Enter or Space key)
showHideBtn.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault(); // Prevent default button behavior
    triggerComments(); // Toggle the comments section
  }
});

// Function to toggle comments visibility and update button text
function triggerComments() {
  // Check if comments section is currently hidden
  const isHidden = commentWrapper.style.display === 'none';

  // Get the current button text
  let showHideText = showHideBtn.textContent;

  // Toggle visibility and update text accordingly
  if(showHideText === 'Show comments') {
    showHideBtn.textContent = 'Hide comments';
    commentWrapper.style.display = 'block';
  } else {
    showHideBtn.textContent = 'Show comments';
    commentWrapper.style.display = 'none';
  }
};

// functionality for adding a new comment via the comments form

// Get the comment form element
const form = document.querySelector('.comment-form');
// Get the name input field
const nameField = document.querySelector('#name');
// Get the comment input field
const commentField = document.querySelector('#comment');
// Get the container where comments will be displayed
const list = document.querySelector('.comment-container');

// When the form is submitted, prevent page reload and submit the comment
form.onsubmit = function(e) {
  e.preventDefault();
  submitComment();
};

// Function to create and add a new comment to the list
function submitComment() {
  // Create elements for a new comment
  const listItem = document.createElement('li');
  const namePara = document.createElement('p');
  const commentPara = document.createElement('p');

  // Get user input values
  const nameValue = nameField.value;
  const commentValue = commentField.value;

  // Set the text content of the elements
  namePara.textContent = nameValue;
  commentPara.textContent = commentValue;

  // Append name and comment to the list item
  list.appendChild(listItem);
  listItem.appendChild(namePara);
  listItem.appendChild(commentPara);

  // Clear input fields after submission
  nameField.value = '';
  commentField.value = '';
}
