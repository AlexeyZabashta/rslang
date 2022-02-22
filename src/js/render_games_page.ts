import { startMiniGame } from '../indexGame';
import { randomDiap } from './clickFunctionSprint';

let gamePageFlag:boolean;
let gameGroupNum:number;
// gameFlag = true старт Спринт, false - старт аудио-игры
// flagStart = true запуск из меню, false - запуск из учебника

async function addListnersGamePage() {
  const gameBtnsWrapper = document.querySelector('.choose_game') as HTMLElement;
  const audioGame = document.querySelector('.game_page_audio') as HTMLElement;
  const audioSprint = document.querySelector('.game_page_sprint') as HTMLElement;
  const groupWrapper = document.querySelector('.choose_group') as HTMLElement;
  audioGame.addEventListener('click', () => {
    gamePageFlag = false;
    groupWrapper.classList.add('active');
    gameBtnsWrapper.classList.add('block');
  });
  audioSprint.addEventListener('click', () => {
    gamePageFlag = true;
    groupWrapper.classList.add('active');
    gameBtnsWrapper.classList.add('block');
  });
  groupWrapper.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).classList.contains('choose_group_num')) {
      const mainHtml = document.querySelector('.main') as HTMLElement;
      gameGroupNum = Number((e.target as HTMLElement).classList[1].slice(9));
      mainHtml.innerHTML = '';
      startMiniGame(gamePageFlag, true, gameGroupNum, randomDiap(0, 29));
    }
  });
}

export async function renderGamesPage() {
  const mainHtml = document.querySelector('.main') as HTMLElement;
  mainHtml.innerHTML = `
  <section class="game_page_wrapper">
    <div class="choose_game">
      <div class="game_page_audio">Start Audio Game</div>
      <div class="game_page_sprint">Start Sprint Game</div>
    </div>
    <div class="choose_group">
      <h2 class="choose_group_h2">Choose group to Start</h2>
      <div class="choose_group_content">
        <div class="choose_group_num group_num1">1</div>
        <div class="choose_group_num group_num2">2</div>
        <div class="choose_group_num group_num3">3</div>
        <div class="choose_group_num group_num4">4</div>
        <div class="choose_group_num group_num5">5</div>
        <div class="choose_group_num group_num6">6</div>
      </div>  
    </div>      
  </section>
  `;
  addListnersGamePage();
}
