import { checkAnsw, answerVariant } from './clickFunction';
import { body } from './const';
import { Word } from './type';

export const renderDOM = async (word:string) => {
  body.innerHTML = `<section class="wrapper_minigame">
  <h2 class="total_score">0</h2>
  <div class="game_content_wrapper">
    <div class="bonus_carousel_wrapper">
      <div class="bonus_carousel">
        <div class="bonus_circle"></div>
        <div class="bonus_circle"></div>
        <div class="bonus_circle"></div>
      </div>
      <h3 class="bonus_size">+20</h3>        
    </div>
    <div class="game_content">
      <div class="bonus_icon_wrapper">
        <img src="../src/assets/red.png" class="bonus_icon" id="red">
        <img src="../src/assets/big.png" class="bonus_icon" id="big">
        <img src="../src/assets/boom.png" class="bonus_icon" id="boom">
        <img src="../src/assets/flash.png" class="bonus_icon" id="flash">
      </div>
      <div class="engl_word">${word}</div>
      <div class="translate_engl_word">${await answerVariant()}</div>
    </div>
    <div class="answer_wrapper">
      <button class="answ_btn" id="answ_false">Неверно</button>
      <button class="answ_btn" id="answ_true">Верно</button>
    </div>
    <img class="answ_result_right" src="../src/assets/true.svg">
    <img class="answ_result_false" src="../src/assets/false.svg">
  </div>
</section>`;
  const btnFalse = document.querySelector('#answ_false') as HTMLElement;
  btnFalse.addEventListener('click', ()=>checkAnsw(false));
  const btnTrue = document.querySelector('#answ_true') as HTMLElement;
  btnTrue.addEventListener('click', ()=>checkAnsw(true));
};