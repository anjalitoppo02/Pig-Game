'use strict';

// Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const playingDice = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

// Starting condition

let scores, currentScore, activePlayer;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  playingDice.classList.add('hidden');
  current0El.textContent = 0;
  current1El.textContent = 0;
  playingDice.classList.add('hidden');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};
init();

function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// rolling dice functionality
rollDiceBtn.addEventListener('click', function () {
  const dice = Math.trunc(Math.random() * 6) + 1;

  playingDice.classList.remove('hidden');
  playingDice.src = 'images/dice-' + dice + '.png';

  if (dice !== 1) {
    currentScore += dice;
    document.getElementById('current--' + activePlayer).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

// hold button functionality
holdBtn.addEventListener('click', function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    rollDiceBtn.disabled = true;
    holdBtn.disabled = true;
    playingDice.classList.add('hidden');
  } else {
    switchPlayer();
  }
});

//Game reset functionality
newGameBtn.addEventListener('click', function () {
  init();

  rollDiceBtn.disabled = false;
  holdBtn.disabled = false;
});
