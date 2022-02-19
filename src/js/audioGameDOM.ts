import { body } from './const';
import { Word } from './typeSprint';
import { randomDiap } from './clickFunctionSprint';

import { getWords } from './requestSprint';

export const falseAnswersAudio: Word[] = [];
export const rightAnswNum: number[] = [];
let indexAnsw = 0;

export const answersAudio:Word[] = [];
export const indWordAudio:number[] = [];

export function clickAudioGame(ind:number, val:boolean) {
  console.log('сработала функция клика', ind + 1, val);
  const answView = document.querySelector(`#audio_answer_variant${ind}`) as HTMLSpanElement;
  if (val) {
    answView.classList.add('right');
  } else {
    answView.classList.add('false');
  }
}

function hideInfo() {
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

function addListnersAudioGame(ind:number) {
  const wordVariants = document.querySelector('.word_variants') as HTMLDivElement;
  const btnIdk = document.querySelector('#idk') as HTMLButtonElement;
  btnIdk.addEventListener('click', () => {
    btnIdk.disabled = true;
    clickIdkAudio(ind);
  });
  wordVariants.addEventListener('click', (e) => {
    if ((e.target as HTMLButtonElement).classList.contains('btn_word_variant')) {
      const targetId:string = (e.target as HTMLButtonElement).id;
      const targetInd = Number(targetId[targetId.length - 1]);
      btnIdk.disabled = true;
      hideAnswersAudio(targetInd);
      hideInfo();
      if (targetInd === ind) {
        clickAudioGame(targetInd, true);
      } else {
        clickAudioGame(targetInd, false);
      }
    }
  });
}

async function updateAudioGameDom(btnIndex:number, rightIndex:number, word:string): Promise<string> {
  if (btnIndex === rightIndex) {
    console.log('верный ответ на кнопке', btnIndex + 1);
    return word;
  }
  const falseInd:number = randomDiap(0, 19);
  return falseAnswersAudio[falseInd].wordTranslate;
}

export const audioDOM = async (val:Word) => {
  const ind = randomDiap(0, 4);
  console.log('верная кнопка: ', ind + 1);
  rightAnswNum.push(ind);
  body.innerHTML = `<section class="wrapper_audioGame">
  <div class="word_block">
    <audio id="audioGame_audio" src="http://localhost:2020/${val.audio}"></audio>
    <div class="hide_info">
      <div class="audio_img" style="background-image: url('http://localhost:2020/${val.image}');"></div>    
      <div class="audio_answer">${val.word} (${val.wordTranslate})</div>
    </div>
    <button id="play_word">
      <img src="../src/assets/volume.svg" id="play_word_audio">        
    </button>      
  </div>
  <div class="word_variants">
    <div class="word_variant">
      <span class="audio_answer_variant" id="audio_answer_variant0"></span>
      <button class="btn_word_variant" id="btn_word_variant0">${await updateAudioGameDom(0, ind, val.wordTranslate)}</button>
    </div>
    <div class="word_variant">
      <span class="audio_answer_variant" id="audio_answer_variant1"></span>
      <button class="btn_word_variant" id="btn_word_variant1">${await updateAudioGameDom(1, ind, val.wordTranslate)}</button>
    </div>
    <div class="word_variant">
      <span class="audio_answer_variant" id="audio_answer_variant2"></span>
      <button class="btn_word_variant" id="btn_word_variant2">${await updateAudioGameDom(2, ind, val.wordTranslate)}</button>
    </div>
    <div class="word_variant">
      <span class="audio_answer_variant" id="audio_answer_variant3"></span>
      <button class="btn_word_variant" id="btn_word_variant3">${await updateAudioGameDom(3, ind, val.wordTranslate)}</button>
    </div>
    <div class="word_variant">
      <span class="audio_answer_variant" id="audio_answer_variant4"></span>
      <button class="btn_word_variant" id="btn_word_variant4">${await updateAudioGameDom(4, ind, val.wordTranslate)}</button>
    </div>
  </div>
  <div class="next_word">
    <button id="idk">Не знаю</button>
    <button id="next_word_btn" disabled>&#8594;</button>
  </div>
  </section>`;
  addListnersAudioGame(ind);
  const btnNext = document.querySelector('#next_word_btn') as HTMLElement;
  btnNext.addEventListener('click', () => {
    indexAnsw += 1;
    audioDOM(answersAudio[indexAnsw]);
  });
  body.classList.add('active');
  const playAudio = document.querySelector('#audioGame_audio') as HTMLAudioElement;
  playAudio.play();
  const playWord = document.querySelector('#play_word') as HTMLButtonElement;
  playWord.addEventListener('click', () => {
    playAudio.play();
  });
};
