import './style.css';
import { Word, GrPg } from './js/typeSprint';
import { answers, createMassFalse, gameTimer } from './js/clickFunctionSprint';
import { sprintDOM } from './js/sprintDOM';
import { getWordsMiniGame, buildMassSprint } from './js/requestSprint';
import { answersAudio, createMassFalseAudio } from './js/audioGameAlg';
import { clearIndexAudio } from './js/audioGameAlg';
import { sprintDefaultIndex } from './js/clickFunctionSprint';

import { audioDOM } from './js/audioGameDOM';

export const startFlag:boolean[] = [];
export const gameFlag:boolean[] = [];
export const groupPage:GrPg[] = [];

async function createDataSprint(flagStart:boolean, group:number, page:number) {
  await createMassFalse(group, page);
  if (flagStart) {
    const respMass:Word[] = await getWordsMiniGame(group, page);
    respMass.map((item) => answers.push(item));
    await sprintDOM(respMass[0].word).then(() => gameTimer());
  } else {
    const newMass = await buildMassSprint(group, page);
    newMass.map((item) => answers.push(item));
    sprintDOM(newMass[0].word).then(() => gameTimer());
  }
}

async function createDataAudio(flagStart:boolean, group:number, page:number) {
  await createMassFalseAudio(group, page);
  if (flagStart) {
    const respMass:Word[] = await getWordsMiniGame(group, page);
    respMass.map((item) => answersAudio.push(item));
    audioDOM(respMass[0]);
  } else {
    const newMass = await buildMassSprint(group, page);
    newMass.map((item) => answersAudio.push(item));
    audioDOM(newMass[0]);
  }
}

export async function startMiniGame(flagGame:boolean, flagStart:boolean, group:number, page:number):Promise<void> {
  // gameFlag = true старт Спринт, false - старт аудио-игры
  // flagStart = true запуск из меню, false - запуск из учебника
  await clearIndexAudio();
  sprintDefaultIndex();
  console.log(flagStart, group, page);
  startFlag.push(flagStart);
  gameFlag.push(flagGame);
  const obj:GrPg = { group, page };
  groupPage.push(obj);
  if (gameFlag[0]) {
    createDataSprint(flagStart, group, page);
  } else {
    createDataAudio(flagStart, group, page);
  }
}
