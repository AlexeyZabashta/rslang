import { Word } from './typeSprint';
import { rightAnswNum, audioDOM } from './audioGameDOM';
import { randomDiap } from './clickFunctionSprint';
import {
  getWordsMiniGame, buildMassSprint, checkGetWordStatus, getUserStat, checkGetUserStatus,
} from './requestSprint';
import {
  startFlag, groupPage, startMiniGame, gameFlag,
} from '../indexGame';

import { renderTextbookPage } from './render_textbook';
import { homePage } from './render_home_page';

const falseAnswersAudio: Word[] = [];
export const answersAudio:Word[] = [];

let indexAnsw = 0;
let seriesAudio = 0;
let bestSeriesAudio = 0;
let rightAnswAudio = 0;

export async function createMassFalseAudio(group:number, page:number) {
  falseAnswersAudio.length = 0;
  if (group < 5) {
    const newFalseMass = await getWordsMiniGame(group + 1, page);
    newFalseMass.map((item) => falseAnswersAudio.push(item));
  } else {
    const newFalseMass = await getWordsMiniGame(group - 1, page);
    newFalseMass.map((item) => falseAnswersAudio.push(item));
  }
  // console.log(answersFalse);
}

export function clickAudioGame(ind:number, val:boolean) {
  // console.log('сработала функция клика', ind + 1, val);
  const answView = document.querySelector(`#audio_answer_variant${ind}`) as HTMLSpanElement;
  if (val) {
    answView.classList.add('right');
  } else {
    answView.classList.add('false');
  }
}

export function hideInfo() {
  const hideDiv = document.querySelector('.hide_info') as HTMLDivElement;
  hideDiv.classList.add('active');
  const btnNext = document.querySelector('#next_word_btn') as HTMLButtonElement;
  btnNext.disabled = false;
}

function hideAnswersAudio(targetInd:number) {
  const answBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.btn_word_variant');
  answBtns.forEach(async (item, index) => {
    item.disabled = true;
    if (targetInd !== index) {
      item.classList.add('block');
    }
  });
}

function clickIdkAudio(ind:number) {
  const answView = document.querySelector(`#audio_answer_variant${ind}`) as HTMLSpanElement;
  answView.classList.add('right');
  hideAnswersAudio(ind);
  hideInfo();
}

async function checkPageAudioTextBook(group:number, page:number):Promise<number | boolean> {
  if (page > 0) {
    const newPage = page - 1;
    groupPage[0].page = newPage;
    const newAnsw = await buildMassSprint(group, newPage);
    if (newAnsw.length === 0) {
      await checkPageAudioTextBook(group, newPage);
    }
    return newPage;
  }
  const newPage = false;
  return newPage;
}

async function checkPageAudioMain() { // проверка для игры из меню
  const { page } = groupPage[0];
  if (page < 29) {
    const newPage = page + 1;
    groupPage[0].page = newPage;
    return newPage;
  }
  const newPage = 0;
  groupPage[0].page = newPage;
  return newPage;
}

export async function clearIndexAudio() {
  startFlag.length = 0;
  gameFlag.length = 0;
  falseAnswersAudio.length = 0;
  answersAudio.length = 0;
  indexAnsw = 0;
  seriesAudio = 0;
  bestSeriesAudio = 0;
  rightAnswAudio = 0;
}

async function endAudioGame() {
  const miniGame = document.querySelector('.wrapper_audioGame') as HTMLElement;
  const wrapper = document.querySelector('.end_audio_train_wrapper') as HTMLElement;
  const total = document.querySelector('.end_game_total') as HTMLElement;
  const series = document.querySelector('.end_game_series') as HTMLElement;
  const percent = document.querySelector('.end_game_percent') as HTMLElement;
  const btnTextbook = document.querySelector('#end_game_textbook') as HTMLButtonElement;
  const btnMain = document.querySelector('#end_game_mainmenu') as HTMLButtonElement;
  const btnNextPage = document.querySelector('#end_game_nextPage') as HTMLButtonElement;
  const info = document.querySelector('.end_audio_info') as HTMLElement;
  miniGame.classList.add('block');
  wrapper.classList.add('active');
  btnNextPage.classList.add('active');
  btnNextPage.addEventListener('click', async () => {
    if (startFlag[0]) {
      const newPage = await checkPageAudioMain();
      startMiniGame(false, true, groupPage[0].group, newPage);
    } else {
      const newPage = await checkPageAudioTextBook(groupPage[0].group, groupPage[0].page);
      if (typeof newPage === 'number') {
        startMiniGame(false, false, groupPage[0].group, newPage);
      } else {
        info.classList.add('active');
        setTimeout(() => {
          info.classList.remove('active');
        }, 1000);
      }
    }

  total.innerHTML = `Total words: ${answersAudio.length}`;
  series.innerHTML = `Best answer series: ${bestSeriesAudio}`;
  const perc = rightAnswAudio / indexAnsw;
  const percStr = (perc * 100).toFixed(1);
  if (indexAnsw > 0) {
    percent.innerHTML = `Answered correctly:  ${percStr}%`;
  } else {
    percent.innerHTML = 'Answered correctly:  0';
  }
  await checkGetUserStatus(percStr, bestSeriesAudio);
  clearIndexAudio();
  btnTextbook.addEventListener('click', renderTextbookPage);
  btnMain.addEventListener('click', homePage);
}

async function checkUserWordAudio(val:boolean) {
  if (localStorage.getItem('userData')) {
    checkGetWordStatus(groupPage[0].group, groupPage[0].page, answersAudio[indexAnsw].id, val);
  }
}

async function checkAnswerAudio(targetInd:number, ind:number) {
  if (targetInd === ind) {
    seriesAudio += 1;
    rightAnswAudio += 1;
    clickAudioGame(targetInd, true);
    checkUserWordAudio(true);
  } else {
    bestSeriesAudio = bestSeriesAudio > seriesAudio ? bestSeriesAudio : seriesAudio;
    seriesAudio = 0;
    clickAudioGame(targetInd, false);
    checkUserWordAudio(false);
  }
}

export function addListnersAudioGame(ind:number) {
  const btnIdk = document.querySelector('#idk') as HTMLButtonElement;
  btnIdk.addEventListener('click', () => {
    btnIdk.disabled = true;
    clickIdkAudio(ind);
    checkUserWordAudio(false);
  });
  const btnNext = document.querySelector('#next_word_btn') as HTMLElement;
  btnNext.addEventListener('click', async () => {
    indexAnsw += 1;
    if (indexAnsw < answersAudio.length - 1) {
      audioDOM(answersAudio[indexAnsw]);
    } else {
      endAudioGame();
    }
  });
  const playAudio = document.querySelector('#audioGame_audio') as HTMLAudioElement;
  playAudio.play();
  const playWord = document.querySelector('#play_word') as HTMLButtonElement;
  playWord.addEventListener('click', () => {
    playAudio.play();
  });
  const wordVariants = document.querySelector('.word_variants') as HTMLDivElement;
  wordVariants.addEventListener('click', (e) => { // клик по кнопке
    if ((e.target as HTMLButtonElement).classList.contains('btn_word_variant')) {
      const targetId:string = (e.target as HTMLButtonElement).id;
      const targetInd = Number(targetId[targetId.length - 1]);
      btnIdk.disabled = true;
      hideAnswersAudio(targetInd);
      hideInfo();
      checkAnswerAudio(targetInd, ind);
    }
  });
}

export const indexVariant:number[] = [];
function randomNum() {
  const newInd = randomDiap(0, 19);
  const val = indexVariant.indexOf(newInd);
  if (val >= 0) {
    // console.log('recursion', indexVariant, val, newInd);
    randomNum();
  }
  indexVariant.push(newInd);
  // console.log('no recursion', indexVariant, val);
  return newInd;
}

export async function updateAudioGameDom(btnIndex:number, rightIndex:number, word:string): Promise<string> {
  if (btnIndex === rightIndex) {
    // console.log('верный ответ на кнопке', btnIndex + 1);
    return word;
  }
  const falseInd:number = randomNum();
  return falseAnswersAudio[falseInd].wordTranslate;
}
