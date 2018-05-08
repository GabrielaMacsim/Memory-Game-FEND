
/*
 * Variables
 */

const activeCards = [];
const cards = document.querySelectorAll('.deck li');

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
