"use strict";

(function(){
$('.card')
.removeClass('match')
.removeClass('open')
.removeClass('show')
})();

const CardHTMLColleciton = document.getElementsByClassName("card");
const CardArray = [].slice.call(CardHTMLColleciton); // convert HTMLCollection to Array
const shuffleCardArray = _.shuffle(CardArray); //randomly shuffle the array using Lodash's shuffle method.
$('.deck').empty();
for (let i = 0; i < CardArray.length; i++)
	{
      $('.deck').append(shuffleCardArray[i]);

	}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let OpenCardArray=[];

function toggleCard() {
    let isNotClicked = (OpenCardArray.length === 0)
    let isClickedOnce = (OpenCardArray.length === 1)
    if (isNotClicked) {
        $(this).toggleClass("show open");
        // .animateCss('flipInY');
        OpenCardArray.push($(this));
        disableOpenCardClick();
    }
    else if (isClickedOnce) {
        // increment moves
        // updateMoves();
        $(this).toggleClass("show open");
        // .animateCss('flipInY');
        OpenCardArray.push($(this));
        setTimeout(matchOpenCards, 1100);
    }
}
// Disable click of the open Cards
function disableOpenCardClick() {
    OpenCardArray.forEach(function (card) {
        //remove each click event handler
        card.off('click');
    });
}
// enable click on the open card

function enableClick() {
    OpenCardArray[0].click(toggleCard);
}
// check openCards if they match or not
function matchOpenCards() {
	let firstFlippedCard = OpenCardArray[0][0].children[0].className;
	let secondFlippedCard = OpenCardArray[1][0].children[0].className;

    if (firstFlippedCard == secondFlippedCard) {
        OpenCardArray.forEach(function(card){
        card.addClass("match");
        });
        disableOpenCardClick();
        removeOpenCards();
    }
    else {
    	OpenCardArray.forEach(function(card){
        card.toggleClass("show open");
        });
        enableClick();
        removeOpenCards();
    }
}
// function to remove openCards
function removeOpenCards() {
    OpenCardArray = [];
}

function playGame() {
    $('.card').click(toggleCard);
}

// start the game
playGame();