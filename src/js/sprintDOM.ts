import { checkAnsw, answerVariant, sprintDefaultIndex } from './clickFunctionSprint';
import { addDOMVariables } from './bonusAlgSprint';
import { homePage } from './render_home_page';
import { renderTextbookPage } from './render_textbook';

export function keySprint(event:KeyboardEvent) {
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    checkAnsw(false);
  }
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    checkAnsw(true);
  }
  const headerNav = document.querySelector('.header-nav') as HTMLElement;
  headerNav.addEventListener('click', (e) => {
    if ((e.target as HTMLButtonElement).classList.contains('nav-btn')) {
      // console.log('обработчик убран');
      document.removeEventListener('keydown', keySprint);
    }
  });
}

function keydownEventListner() {
  document.addEventListener('keyup', (event) => keySprint(event));
}

export const sprintDOM = async (word:string) => {
  const mainSection = document.querySelector('.main') as HTMLElement;
  mainSection.innerHTML = `
  <section class="wrapper_minigame">
    <div class="sprint_minigame">
      <audio id="game_timer" src="../rslang/src/assets/audio/timer.mp3"></audio>
      <audio id="answer_sound"></audio>
      <audio id="answer_bonus"></audio>
      <h2 class="total_score">0</h2>
      <div class="game_content_wrapper">
        <div class="bonus_carousel_wrapper">
          <div class="bonus_carousel">
            <div class="bonus_circle"></div>
            <div class="bonus_circle"></div>
            <div class="bonus_circle"></div>
          </div>
        <h3 class="bonus_size">очков за слово</h3>        
      </div>
      <div class="game_content">
        <div class="bonus_icon_wrapper">
          <img src="../rslang/src/assets/red.png" class="bonus_icon" id="red">
          <img src="../rslang/src/assets/big.png" class="bonus_icon big" id="big">
          <img src="../rslang/src/assets/boom.png" class="bonus_icon boom" id="boom">
          <img src="../rslang/src/assets/flash.png" class="bonus_icon flash" id="flash">
        </div>
        <div class="engl_word">${word}</div>
        <div class="translate_engl_word">${await answerVariant()}</div>
      </div>
      <div class="answer_wrapper">
        <button class="answ_btn" id="answ_false">Неверно</button>
        <button class="answ_btn" id="answ_true">Верно</button>
      </div>
      <div class="sprint_key_icon">
        <img src="../rslang/src/assets/arr_left.svg">
        <img src="../rslang/src/assets/arr_right.svg">
      </div>
      <img class="answ_result_right" src="../rslang/src/assets/true2.svg">
      <img class="answ_result_false" src="../rslang/src/assets/false2.svg">
    </div>  
    <div class="timer_value">60</div>
  </div>
  <div class="wrapper_end_game">
    <div class="end_game">
        <div class="end_game_score"></div>
        <div class="end_game_total"></div>
        <div class="end_game_series"></div>
        <div class="end_game_percent"></div>
        <button id="end_game_textbook">Back to TextBook</button>
        <button id="end_game_mainmenu">Back to Menu</button>
    </div>
  </div>   
</section>
`;
  const btnFalse = document.querySelector('#answ_false') as HTMLElement;
  btnFalse.addEventListener('click', () => checkAnsw(false));
  const btnTrue = document.querySelector('#answ_true') as HTMLElement;
  btnTrue.addEventListener('click', () => checkAnsw(true));
  keydownEventListner();
  addDOMVariables();
  const backMain = document.querySelector('#end_game_mainmenu') as HTMLElement;
  backMain.addEventListener('click', () => {
    homePage();
    sprintDefaultIndex();
  });
  const backText = document.querySelector('#end_game_textbook') as HTMLElement;
  backText.addEventListener('click', () => {
    renderTextbookPage();
    sprintDefaultIndex();
  });
};
