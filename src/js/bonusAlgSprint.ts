let bonusIndex = 0;
let circleMass:NodeListOf<HTMLElement>;
let totalPointsDOM:HTMLElement;
let bonusSize:number;
let totalPoints = 0;
export const massPoint:number[] = [];
let bonusPoint:HTMLElement;
let flagDOM = false;
const flagTimer = false;

let big:HTMLElement;
let boom:HTMLElement;
let flash:HTMLElement;
let birdsMass:NodeListOf<HTMLElement>;

let answerSound:HTMLAudioElement;
let answerBonus:HTMLAudioElement;

async function playBonusSound() {
  answerBonus.src = '../src/assets/audio/bonus.mp3';
  answerBonus.play();
}

async function playSoundAnswer(val:boolean) {
  if (val) {
    answerSound.src = '../src/assets/audio/right2.mp3';
    answerSound.play();
  } else {
    answerSound.src = '../src/assets/audio/wrong2.mp3';
    answerSound.play();
  }
}

function checkBonusSize():void {
  const oldBonus = bonusSize;
  switch (true) {
    case ((bonusIndex >= 0) && (bonusIndex < 4)):
      bonusSize = 10;
      break;
    case ((bonusIndex >= 4) && (bonusIndex < 7)):
      bonusSize = 20;
      big.classList.add('active');
      break;
    case ((bonusIndex >= 7) && (bonusIndex < 9)):
      bonusSize = 40;
      boom.classList.add('active');
      break;
    case (bonusIndex === 10):
      bonusSize = 80;
      flash.classList.add('active');
      break;
    default:
      // console.log('def');
      break;
  }
  if (oldBonus < bonusSize) {
    playBonusSound();
  }
}

function growBonus():void {
  const variable = bonusIndex % circleMass.length;
  switch (variable) {
    case 0:
      circleMass[2].classList.add('active');
      break;
    case 1:
      circleMass.forEach((item) => item.classList.remove('active'));
      circleMass[0].classList.add('active');
      break;
    case 2:
      circleMass[1].classList.add('active');
      break;
    default:
      break;
  }
}

export function addDOMVariables():void {
  circleMass = document.querySelectorAll('.bonus_circle');
  birdsMass = document.querySelectorAll('.bonus_icon');
  totalPointsDOM = document.querySelector('.total_score') as HTMLElement;
  bonusPoint = document.querySelector('.bonus_size') as HTMLElement;
  big = document.querySelector('.big') as HTMLElement;
  boom = document.querySelector('.boom') as HTMLElement;
  flash = document.querySelector('.flash') as HTMLElement;

  answerSound = document.querySelector('#answer_sound') as HTMLAudioElement;
  answerBonus = document.querySelector('#answer_bonus') as HTMLAudioElement;
  flagDOM = true;
}

export function checkBonus(val:boolean):void {
  if (val) {
    if (bonusIndex !== 10) {
      bonusIndex += 1;
      checkBonusSize();
      growBonus();
      if (bonusIndex === 10) {
        circleMass[0].classList.add('max');
        circleMass[1].classList.add('active');
        circleMass[2].classList.add('max');
      }
    }
    totalPoints += bonusSize;
  } else {
    bonusIndex = 0;
    checkBonusSize();
    circleMass.forEach((item) => {
      item.classList.remove('active');
      item.classList.remove('max');
    });
    birdsMass.forEach((item) => {
      item.classList.remove('active');
    });
  }
  if (bonusIndex < 4) {
    bonusPoint.classList.remove('active');
  } else {
    bonusPoint.classList.add('active');
  }
  playSoundAnswer(val);
  bonusPoint.innerHTML = `+${bonusSize} очков за слово`;
  totalPointsDOM.innerHTML = `${totalPoints}`;
  massPoint.length = 0;
  massPoint.push(totalPoints);
}
