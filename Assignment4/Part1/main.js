// Selecting elements from the HTML
const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

// Function to select a random value from an array
function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

// Base story template with placeholders
const storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then turned into :insertz: and crawled away. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";

// Arrays containing different story elements
const insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
const insertY = ["the soup kitchen", "Disneyland", "the White House"];
const insertZ = ["a slug", "a monkey", "a robot"];

// Event listener to trigger story generation when the button is clicked
randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;
    
    // Randomly selecting story elements
    const xItem = randomValueFromArray(insertX);
    const yItem = randomValueFromArray(insertY);
    const zItem = randomValueFromArray(insertZ);
    
    // Replacing placeholders in the story template
    newStory = newStory.replaceAll(':insertx:', xItem);
    newStory = newStory.replace(':inserty:', yItem);
    newStory = newStory.replace(':insertz:', zItem);
    
    // If the user enters a custom name, replace 'Bob' with the input name
    if (customName.value !== '') {
        newStory = newStory.replace('Bob', customName.value);
    }

    // Adjusting the story if UK is selected (convert weight and temperature)
    if (document.getElementById('uk').checked) {
        const weight = Math.round(300 * 0.071429) + ' stone'; // Convert pounds to stone
        const temperature = Math.round((94 - 32) * 5 / 9) + ' centigrade'; // Convert Fahrenheit to Celsius
        
        newStory = newStory.replace('300 pounds', weight);
        newStory = newStory.replace('94 fahrenheit', temperature);
    }
    
    // Display the generated story
    story.textContent = newStory;
    story.style.visibility = 'visible';
}