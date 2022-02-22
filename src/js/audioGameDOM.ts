import { Word } from './typeSprint';
import { randomDiap } from './clickFunctionSprint';
import { updateAudioGameDom, addListnersAudioGame, indexVariant } from './audioGameAlg';

export const rightAnswNum: number[] = [];

export const audioDOM = async (val:Word) => {
  const mainSection = document.querySelector('.main') as HTMLElement;
  const ind = randomDiap(0, 4); // индекс кнопки с верным ответом
  //console.log('верная кнопка: ', ind + 1);
  rightAnswNum.push(ind);
  mainSection.innerHTML = `
  <section class="wrapper_audioGame">
    <div class="audioGame_content">
    <div class="word_block">
      <audio id="audioGame_audio" src="http://alexrslangproject.herokuapp.com/${val.audio}"></audio>
      <div class="hide_info">
        <div class="audio_img" style="background-image: url('http://alexrslangproject.herokuapp.com/${val.image}');"></div>    
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
  </section>
  <section class="end_audio_train_wrapper">
    <div class="end_audio_train">    
        <div class="end_game_total"></div>
        <div class="end_game_series"></div>
        <div class="end_game_percent"></div>
        <button id="end_game_textbook">Back to TextBook</button>
        <button id="end_game_mainmenu">Back to Menu</button>
        <button id="end_game_nextPage">To the next page</button>
    </div>
    <div class="end_audio_info">
    The completed pages in the textbook are over!<br>
    Back to Menu or Text Book for play again    
    </div>
    </div>
  </section>`;
  addListnersAudioGame(ind);
  indexVariant.length = 0;
};
