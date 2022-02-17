import { checkAnsw, answerVariant } from './clickFunctionSprint';
import { gameTimer, addDOMVariables } from './bonusAlgSprint';
import { body } from './const';
import { Word } from './typeSprint';

export const sprintDOM = async (word:string) => {
  body.innerHTML = `<section class="wrapper_minigame">
  <audio id="game_timer" src="../src/assets/audio/timer.mp3"></audio>
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
        <img src="../src/assets/red.png" class="bonus_icon" id="red">
        <img src="../src/assets/big.png" class="bonus_icon big" id="big">
        <img src="../src/assets/boom.png" class="bonus_icon boom" id="boom">
        <img src="../src/assets/flash.png" class="bonus_icon flash" id="flash">
      </div>
      <div class="engl_word">${word}</div>
      <div class="translate_engl_word">${await answerVariant()}</div>
    </div>
    <div class="answer_wrapper">
      <button class="answ_btn" id="answ_false">Неверно</button>
      <button class="answ_btn" id="answ_true">Верно</button>
    </div>
    <img class="answ_result_right" src="../src/assets/true2.svg">
    <img class="answ_result_false" src="../src/assets/false2.svg">
  </div>
  <div class="timer_value">60</div>
</section>`;
  const btnFalse = document.querySelector('#answ_false') as HTMLElement;
  btnFalse.addEventListener('click', ()=>checkAnsw(false));
  const btnTrue = document.querySelector('#answ_true') as HTMLElement;
  btnTrue.addEventListener('click', ()=>checkAnsw(true));
  addDOMVariables();  
};