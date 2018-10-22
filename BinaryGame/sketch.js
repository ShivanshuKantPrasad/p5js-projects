const practiceBtn = document.querySelector("#Practice");
const timedBtn = document.querySelector("#Timed");
const instructions = document.querySelector("#instructions");
const game = document.querySelector('#game');
const response = document.querySelector('#response');

const correct = document.querySelector('.correct');
const wrong = document.querySelector('.wrong');

const scoreDisplay = document.querySelector('#score');
const highScoreDisplay = document.querySelector('#highScore');

const dots = document.querySelectorAll('.dot');
game.style.display = 'none';

let currentScore = 0;
let highScore = 0;

let currentNumber = 0;
let isTimedMode = false;

function playGame(isTimed) {

  game.style.display = 'block';
  instructions.style.display = 'none';
  isTimedMode = isTimed;

  startRound();

}

function startRound(){

  if(isTimedMode) {
    setTimeout(() => {

    }, 1000);
  }

  response.value = '';

  currentNumber = Math.floor(Math.random() * 256);
  for (let i = 7; i >= 0; i--) {
    dots[7 - i].className = ('class',  `${(currentNumber >> i) & 1 ? 'on' : 'off'} dot`);
  }
  console.log(currentNumber);

}

response.addEventListener('input', e => {
  const res = parseInt(e.target.value);
  console.log(res == currentNumber ? 'Correct Answer' : 'Try Again');
  if(res == currentNumber){
    correct.style.display = 'block';
    setTimeout(() => {
      correct.style.display = 'none';
      currentScore += 10;
      scoreDisplay.innerText = `Score: ${currentScore}`;

      if(currentScore > highScore) {
        highScore = currentScore;
        highScoreDisplay.innerText = `High Score: ${highScore}`;
      }

      console.log(currentScore);
      startRound();

    }, 300)
  }
});



practiceBtn.addEventListener('click', e => {
  playGame(false);
});

timedBtn.addEventListener('click', e => {
  playGame(true);
});
