// import { link } from 'fs';
import * as json from '../../data.json';
const cards = document.querySelectorAll('.category');
const ranges = document.querySelectorAll('.range');

let data = json;
let dataArray = [];

// CREATE ARRAY FROM JSON DATA
for (let i = 0; i < data.length; i++) {
  const el = data[i];
  dataArray.push(el);
}

// Set initial range
let range = 'Daily';

// Listen for change in range
// Add multiple listeners (click or touchstart) to an element
// https://stackoverflow.com/a/8797106/13604562
function addListenerMulti(element, eventNames, listener) {
  eventNames.split(' ').forEach(e => element.addEventListener(e, listener, false));
}

ranges.forEach((el) => {
  addListenerMulti(el, 'click touchstart', (e) => {
    range = e.originalTarget.innerHTML;
    updateAllCards();
    updateClassListForRanges(e.originalTarget)
  })
});



// Removes active class from previous selection and adds it to current selection
function updateClassListForRanges (setRange) {
    ranges.forEach((el) => {
        el.classList.remove('active')

    })
    setRange.classList.add('active')
}

// FUNCTION WILL GET INDEX OF OBJECT IN dataArray, BASED ON VALUE OF object.title
// CAN BE USED TO MAP TO CARDS NODE LIST
function getObjectIndex(category) {
  const index = dataArray.findIndex((object) => {
    return category.includes(object.title);
  });
  return index;
}

function updateAllCards() {
  // Loops through cards and finds the index of corresponding data object
  cards.forEach((element, idx) => {
    const categoryName = element.childNodes[0].childNodes[0].data;
    const IDXofDataObj = getObjectIndex(categoryName);

    // Send card index and object index to function to update a card
    updateSingleCard(idx, IDXofDataObj);
  });
}

// Function accepts the index position for the cards array and dataArray
// and updates the specific card with the corresponding object data
function updateSingleCard(card, obj) {
  // Gets correct timeframe based on the range the user selects using the variable 'range'
  const dataTimeframe = data[obj].timeframes[range.toLocaleLowerCase()];

  // Declare variables for the current and previous elements in the DOM
  
  const current = cards[card].childNodes[1].childNodes[0];
  const previous = cards[card].childNodes[1].childNodes[1].childNodes[1];
  const rangeOfPrevious = cards[card].childNodes[1].childNodes[1].childNodes[0];

  if (range.includes('Daily')) {rangeOfPrevious.data = 'Yesterday - '}
  if (range.includes('Weekly')) {rangeOfPrevious.data = 'Last Week - '}
  if (range.includes('Monthly')) {rangeOfPrevious.data = 'Last Month - '}

  // Update innerHTML of current and Previous elements
  current.innerHTML =
    dataTimeframe.current + (dataTimeframe.current === 1 ? 'hr' : 'hrs');
  previous.innerHTML =
    dataTimeframe.previous + (dataTimeframe.previous === 1 ? 'hr' : 'hrs');
}

updateAllCards();

export default importData;