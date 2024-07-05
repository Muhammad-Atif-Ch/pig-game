const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

const diceDom = document.querySelector('.dice');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const source0 = document.querySelector('#score--0');
const source1 = document.querySelector('#score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

let scores, roundScore, activePlayer, playing;

const init = function () {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    playing = true;

    diceDom.style.display = 'none';

    source0.textContent = 0;
    current0.textContent = 0;
    source1.textContent = 0;
    current1.textContent = 0;

    btnRoll.disabled = false;
    btnHold.disabled = false;
}
init();

const switchPlayer = function () {
    roundScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = roundScore;
    activePlayer = (activePlayer == 0) ? 1 : 0;

    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}
const rollDice = function () {
    if (playing) {
        let dice = Math.floor(Math.random() * 6) + 1;
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';

        if (dice !== 1) {
            roundScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = roundScore;
        } else {
            switchPlayer();
        }
    }
}

const hold = function () {
    if (playing) {
        scores[activePlayer] += roundScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 100) {
            playing = false;
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
}

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', hold);
btnNew.addEventListener('click', init);