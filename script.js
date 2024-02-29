'use strict';

//Selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const newBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');

//reseting elements
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');

let scores;
let currentScore;
let activePlayer;
let playing;
//do it this way
//let scores, currentScore, activePlayer, playing;

const init = function () {
    score0El.innerHTML = 0;
    score1El.innerHTML = 0;

    currentScore0.innerHTML = 0;
    currentScore1.innerHTML = 0;

    diceEl.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0
    playing = true;

    player0.classList.add('player--active');
    player1.classList.remove('player--active');
}
init();

const switchPlayer = function () {
    document.querySelector(`#current--${activePlayer}`).textContent = 0
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}


//rolling dice
rollBtn.addEventListener('click', () => {
    if (playing) {
        
        //generate a random dice roll
        const rolledDice = Math.floor(Math.random() * 6) + 1;

        //display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${rolledDice}.png`;

        //check for rolled 1: if true, switch user

        if (rolledDice !== 1) {
            currentScore += rolledDice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
})

//user hold current point in total score
holdBtn.addEventListener('click', () => {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
})

//reset game
newBtn.addEventListener('click', () => {
    init();
})