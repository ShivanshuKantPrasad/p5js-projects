const practiceBtn = document.querySelector("#Practice");
const timedBtn = document.querySelector("#Timed");
const instructions = document.querySelector("#instructions");
const game = document.querySelector('#game');
const response = document.querySelector('#response');

const correct = document.querySelector('.correct');
const wrong = document.querySelector('.wrong');

const dots = document.querySelectorAll('.dot');
game.style.display = 'none';

let currentScore = 0;
let highScore = 0;

let currentNumber = 0;
let isTimedMode = false;

function playGame(isTimed) {
  console.log(`Playing Game with timer ${isTimed ? 'on' : 'off'}`);
  game.style.display = 'block';
  instructions.style.display = 'none';
  isTimedMode = isTimed;

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
      console.log(currentScore);
      playGame(isTimedMode);

    }, 1000)
  }
});



practiceBtn.addEventListener('click', e => {
  playGame(false);
});

timedBtn.addEventListener('click', e => {
  playGame(true);
});
