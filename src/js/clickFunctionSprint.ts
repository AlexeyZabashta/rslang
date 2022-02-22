import { Word, GrPg } from './typeSprint';
import { checkBonus, massPoint } from './bonusAlgSprint';
import { IaggregatedWord } from './data';
import { startFlag, groupPage, gameFlag } from '../indexGame';
import {
  getWordUserSprint, getWordsMiniGame, buildMassSprint, checkGetWordStatus, checkGetUserStatus,
} from './requestSprint';

export const answers:Word[] = [];
export const answersTextBook:IaggregatedWord[] = [];

let newAnswMass:Word[] = [];
let answersFalse:Word[] = [];
let answersIndex = 0;
let answerFlag:boolean;
let bestSeries = 0;
let bestSeriesOld = 0;
let allAnswers = 0;
let rightAnswers = 0;
let timerId:NodeJS.Timeout;
let timer:HTMLAudioElement;

export function sprintDefaultIndex() {
  answersIndex = 0;
  bestSeries = 0;
  allAnswers = 0;
  rightAnswers = 0;
  answersFalse.length = 0;
  answers.length = 0;
  startFlag.length = 0;
  gameFlag.length = 0;
}

export function randomDiap(min:number, max:number) {
  const rndGroup = Math.floor(Math.random() * (max - min + 1)) + min;
  return rndGroup;
}

export async function answerVariant() {
  const rnd = Math.round(Math.random());
  if (rnd === 1) {
    answerFlag = true;
    return answers[answersIndex].wordTranslate;
  }
  answerFlag = false;
  return answersFalse[randomDiap(0, 19)].wordTranslate;
}

async function newWordDOM() {
  const englWord = document.querySelector('.engl_word') as HTMLElement;
  const translWord = document.querySelector('.translate_engl_word') as HTMLElement;
  englWord.textContent = answers[answersIndex].word;
  translWord.textContent = await answerVariant();
}

export async function falseAnsw() {
  const answer = document.querySelector('.answ_result_false') as HTMLElement;
  answer.classList.add('click');
  answer.ontransitionend = function () {
    answer.classList.remove('click');
  };
}

export async function trueAnsw() {
  const answer = document.querySelector('.answ_result_right') as HTMLElement;
  answer.classList.add('click');
  answer.ontransitionend = function () {
    answer.classList.remove('click');
  };
}

function checkPage(page:number):number {
  if (page < 29) {
    const newPage = page + 1;
    return newPage;
  }
  const newPage = 0;
  return newPage;
}

export async function createMassFalse(group:number, page:number) {
  if (group < 5) {
    answersFalse = await getWordsMiniGame(group + 1, page);
  } else {
    answersFalse = await getWordsMiniGame(group - 1, page);
  }
  // console.log(answersFalse);
}

async function checkIndex() {
  const { page } = groupPage[0];
  const { group } = groupPage[0];
  if (answersIndex < 19) {
    answersIndex += 1;
  } else {
    answersIndex = 0;
    answers.length = 0;
    const newPage:number = checkPage(page);
    const newAnsw = await getWordsMiniGame(group, newPage);
    newAnsw.map((item) => answers.push(item));
    await createMassFalse(group, newPage);
  }
}

async function checkPageTextBook(group:number, page:number):Promise<number | boolean> {
  if (page - 1 >= 0) {
    groupPage[0].page = page - 1;
    const newPage = page - 1;
    if (localStorage.getItem('userData')) {
      newAnswMass = await buildMassSprint(group, newPage);
    } else {
      newAnswMass = await getWordsMiniGame(group, newPage);
    }
    if (newAnswMass.length === 0) {
      await checkPageTextBook(group, newPage);
    }
    // console.log('newPage ', newPage);
    return newPage;
  }
  const newPage = false;
  // console.log('newPage ', newPage);
  return newPage;
}

async function checkNewPageTextbookSprint(group:number, newPage:number) {
  const newAnsw = await buildMassSprint(group, newPage);
  newAnsw.map((item) => answers.push(item));
  await createMassFalse(group, newPage);
  newWordDOM();
}

export async function createSprintResult() {
  const wrapperEndgame = document.querySelector('.wrapper_end_game') as HTMLDivElement;
  const wrapperMinigame = document.querySelector('.sprint_minigame') as HTMLDivElement;
  const endScore = document.querySelector('.end_game_score') as HTMLDivElement;
  const endTotal = document.querySelector('.end_game_total') as HTMLDivElement;
  const endSer = document.querySelector('.end_game_series') as HTMLDivElement;
  const endPer = document.querySelector('.end_game_percent') as HTMLDivElement;
  wrapperMinigame.classList.add('block');
  wrapperEndgame.classList.add('active');
  endScore.innerHTML = `Score: ${massPoint[0]}`;
  endTotal.innerHTML = `Total number of words: ${allAnswers}`;
  endSer.innerHTML = `Best right-series:  ${bestSeriesOld}`;
  const perc = rightAnswers / allAnswers;
  const percStr = (perc * 100).toFixed(1);
  if (allAnswers > 0) {
    endPer.innerHTML = `Answered correctly:  ${percStr}%`;
  } else {
    endPer.innerHTML = 'Answered correctly:  0';
  }  
  console.log('stop game' );
  await checkGetUserStatus(percStr, bestSeriesOld);
}

export async function gameTimer() {
  const timerValue = document.querySelector('.timer_value') as HTMLElement;
  timer = document.querySelector('#game_timer') as HTMLAudioElement;
  // console.log(timer);
  timer.play();
  timerId = setTimeout(function tick() {
    if (timer.currentTime < timer.duration) {
      timerValue.textContent = `${Math.round(timer.duration - timer.currentTime)}`;
      timerId = setTimeout(tick, 1000);
    } else {
      clearTimeout(timerId);
      createSprintResult();
    }
  }, 1000);
}

async function checkIndexTextbook() {
  const { page } = groupPage[0];
  const { group } = groupPage[0];
  // console.log('answersIndex: ', answersIndex, 'answers.length', answers.length);
  if (answersIndex < answers.length - 1) {
    answersIndex += 1;
    newWordDOM();
  } else {
    answersIndex = 0;
    answers.length = 0;
    const newPage:number | boolean = await checkPageTextBook(group, page);
    if (typeof newPage === 'number') {
      await checkNewPageTextbookSprint(group, newPage);
      // console.log('answers ', answers);
      await newWordDOM();
    } else {
      createSprintResult();
      timer.pause();
      clearTimeout(timerId);
    }
  }
}

function allBtnsBlock() {
  const btns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.answ_btn');
  btns.forEach((item) => { item.disabled = true; });
}

function allBtnsUnlock() {
  const btns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.answ_btn');
  btns.forEach((item) => { item.disabled = false; });
}

export async function checkAuthSprint(flag: boolean, answ: boolean) {
  if (localStorage.getItem('userData')) {
    if (flag === answ) {
      checkGetWordStatus(groupPage[0].group, groupPage[0].page, answers[answersIndex].id, true).catch(async (error) => {
        // console.log('abc');
        if (error.status === 404) {
          // console.log(error.status);
        }
      });
    } else {
      checkGetWordStatus(groupPage[0].group, groupPage[0].page, answers[answersIndex].id, false).catch(async (error) => {
        // console.log('abc');
        if (error.status === 404) {
          // console.log(error.status);
        }
      });
    }
  }
}

export async function checkAnsw(val:boolean) {
  // console.log('val: ', val, 'answerFlag: ', answerFlag);
  // console.log('if result: ', val === answerFlag);
  if (answerFlag === val) {
    trueAnsw();
    checkBonus(true);
    rightAnswers += 1;
    bestSeries += 1;
  } else {
    bestSeriesOld = bestSeriesOld < bestSeries ? bestSeries : bestSeriesOld;
    bestSeries = 0;
    checkBonus(false);
    falseAnsw();
  }
  allAnswers += 1;
  if (startFlag[0]) {
    await checkIndex();
    newWordDOM();
  } else {
    // console.log('textBook');
    checkAuthSprint(answerFlag, val);
    allBtnsBlock();
    await checkIndexTextbook().then(() => {
      allBtnsUnlock();
    });
  }
}
