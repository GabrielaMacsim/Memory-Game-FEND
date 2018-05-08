
/*
 * Variables
 */

const activeCards = [];
const cards = document.querySelectorAll('.deck li');
var firstClick = true;

/*
 * A list that holds all cards
 */

var arrayOfImages = ['fa-tree', 'fa-hand-spock-o', 'fa-paw', 'fa-sun-o', 'fa-moon-o', 'fa-paw', 'fa-leaf', 'fa-bicycle', 'fa-tree', 'fa-pagelines', 'fa-leaf','fa-pagelines', 'fa-sun-o', 'fa-bicycle', 'fa-hand-spock-o', 'fa-moon-o'];

/*
 * The shuffle function from http://stackoverflow.com/a/2450976
 */

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * Display the cards on the page
*/

function showCard (card) {
  card.classList.add('open', 'show');
}

function isAlreadyMatched(card) {
  return card.classList.contains('show');
}

/*
 * Check if the clicked card matches an other card
*/

function checkClickedCard (event) {
  // display the card's symbol
  let clickedCard = event.target;

  // check if the target is the icon, in which case use the parseInt
  if (clickedCard.tagName == "I") {
    clickedCard = clickedCard.parentElement;
  }

  // check if this is the first click of the game
  if (firstClick) {
    // we're in the first click, so set this to false
    firstClick = false;
  }
  // if card is already matched, do nothing
  if  (isAlreadyMatched (clickedCard)) {
    return;
  }

  showCard(clickedCard);
  if ( activeCards.length === 0 ) { // if there is no other unmatched active card
    activeCards.push(clickedCard);
  } else { // if there is one unmatched active card
    otherActiveCard = activeCards.pop();
    otherActiveCardImageClass = otherActiveCard.children[0].classList;
    clickedCardImageClass = clickedCard.children[0].classList;

    if (otherActiveCardImageClass.toString() ===    clickedCardImageClass.toString()) {
      matchCards(otherActiveCard, clickedCard);
    } else {
      hideCards(otherActiveCard, clickedCard);
    }
  }
}

for ( let i = 0; i < cards.length; i++) {
  let card = cards[i];
  card.addEventListener('click', checkClickedCard);
}

/*
 * Function that gives the clicked unmatched cards the class of wrong that changes them to red
*/
function hideCards(cardA, cardB) {
  cardA.classList.add('wrong');
  cardB.classList.add('wrong');

  setTimeout(function() {
    cardA.classList.remove('open', 'show', 'wrong');
    cardB.classList.remove('open', 'show', 'wrong');
  }, 700)

}
