import { Word } from './typeSprint';
import { rightAnswNum } from './audioGameDOM';

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

export function clickIdkAudio(ind:number) {
  const answView = document.querySelector(`#audio_answer_variant${ind}`) as HTMLSpanElement;
  answView.classList.add('right');
}



//export async function nextAudioRender() {}