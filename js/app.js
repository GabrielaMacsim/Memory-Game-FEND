
/*
 * Variables
 */

const cards = document.querySelectorAll('.deck li');
const restart = document.querySelector('.restart');
const allMatchedCards = document.getElementsByClassName('card match open show');
const activeCards = [];
let firstClick = true;
let timeInterval = null;

/*
 * A list that holds all cards
 */

var arrayOfImages = ['fa-tree', 'fa-hand-spock-o', 'fa-paw', 'fa-sun-o', 'fa-moon-o', 'fa-paw', 'fa-leaf', 'fa-bicycle', 'fa-tree', 'fa-pagelines', 'fa-leaf','fa-pagelines', 'fa-sun-o', 'fa-bicycle', 'fa-hand-spock-o', 'fa-moon-o'];

/*
 * The shuffle function
*/

function shuffle (array) {
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
 * Timer for game
*/

function refreshTime(elapsedSeconds) {
  let minutes = Math.floor(elapsedSeconds/60);
  let seconds = elapsedSeconds % 60;

  let prefixedMinutes = minutes < 10 ? "0" + minutes : minutes;
  let prefixedSeconds = seconds < 10 ? "0" + seconds : seconds;

  $(".timer").text(prefixedMinutes + ":" + prefixedSeconds);
}

function startTimer() {
  let nrOfSeconds = 0;
  let firstClickDate = new Date();
      timeInterval = setInterval(function() {
         nrOfSeconds = nrOfSeconds + 1;
         refreshTime(nrOfSeconds);
      }, 1000);
}

function resetTimer() {
    clearInterval(timeInterval);
    $(".timer").text("00:00");
}

/*
 * Counter of clicked unopened cards during the game
*/

function getCurrentNrOfMoves() {
  return Number.parseInt($(".moves").text());
}

function increaseNrOfMoves() {
  let currentNumber = getCurrentNrOfMoves();
  currentNumber = currentNumber + 1;
  $(".moves").text(currentNumber);
}

function resetNrOfMoves() {
  $(".moves").text("0");
}

/*
 * Change stars according to number of moves
*/

function refreshNrOfStars() {
  let currentNumber = getCurrentNrOfMoves();
  starsList = $("ul.item1.stars > li > i");
  if (currentNumber == 20) {
      starsList[2].classList.replace("fa-star", "fa-star-o");
    } else if (currentNumber == 40)  {
        starsList[1].classList.replace("fa-star", "fa-star-o");
    }
}

function redrawStars() {
  let starsList = $("ul.item1.stars > li > i");
  for (let i = 0; i < starsList.length; i++) {
    let star = starsList[i];
    star.classList.replace("fa-star-o", "fa-star");
  }
}

/*
 * Check if the clicked card matches an other card and start timer and counter
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
    //Start timer
    startTimer();
  }
  // if card is already matched, do nothing
  if  (isAlreadyMatched (clickedCard)) {
    return;
  }
 //count the number of clicks on unopened cards
  increaseNrOfMoves();

  // refresh the number of stars based on the current number of moves
  refreshNrOfStars();

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
 * Function for reseting all functions of the game: counter, timer, stars, shuffling
*/

function restartAll () {
  resetNrOfMoves();
  resetTimer();
  redrawStars();

  firstClick = true;

  shuffle (arrayOfImages);

  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];

    // hide card
    card.classList.remove('open', 'show', 'match');

    // get <i> element of card which has the class with the image
    let cardImage = card.children[0];

    // get the current image class of the <i> element
    let oldClass = cardImage.classList[1];

    // replace the <i>'s image class with the new shuffled image class
    // from the shuffled arrayOfImages
    cardImage.classList.replace(oldClass, arrayOfImages[i]);
   }
}

restart.addEventListener('click', restartAll); // Event listener for the restart button that triggers the restarAll function

window.onload = restartAll; // All funtions to be reset when the page starts

/*
 * Function that counts the remaining stars at the end of the game
*/

function getStarRating() {
  let starList = $("ul.item1.stars > li > i");
  let nrOfFullStars = 0;
  for (let i = 0; i < starList.length; i++) {
    curStar = starList[i];
    if (curStar.classList.contains("fa-star")) {
      nrOfFullStars++;
    }
  }
  return nrOfFullStars;
}

/*
 * Function that triggers the modal once all 16 cards have been matched
*/

function matchCards(cardA, cardB) {
  cardA.classList.add('match');
  cardB.classList.add('match');
  if (allMatchedCards.length == 16) {
    setTimeout(function() {
      let timeSpent = $(".timer").text();
      let nrOfMoves = $(".moves").text();
      let starRating = getStarRating();

      $('#myModal').modal('show');
      $('#modal-time').text("Time elapsed: " + timeSpent);
      $('#modal-moves').text("Number of moves: " + nrOfMoves);
      $('#modal-stars').text("Star rating: " + starRating);
      clearInterval(timeInterval);
    }, 1000);
  }
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
  }, 700);

}
