'use-strict';
//references

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

const sc1 = document.getElementById('score--0');
const sc2 = document.getElementById('score--1');

const butRoll = document.querySelector('.btn--roll');
const butHold = document.querySelector('.btn--hold');

const tp1 = document.getElementById('current--0');
const tp2 = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const newGame = document.querySelector('.btn--new');

// declaration
let scores, currentScore, activePlayer, playing;

// initialization
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  sc1.textContent = 0;
  sc2.textContent = 0;
  tp1.textContent = 0;
  tp2.textContent = 0;
  
  diceEl.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
};
init();

// switch function

const switchFun = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

// dice roll

butRoll.addEventListener('click', function () {
  if (playing) {
    //random no

    let ran = Number(Math.trunc(Math.random() * 6 + 1));

    //Display

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${ran}.png`;

    // '1' check
    if (ran === 1) {
      switchFun();
    } else {
      currentScore += ran;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

// btn Hold

butHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // winner check
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchFun();
    }
  }
});

newGame.addEventListener('click', init);
