import './style.css';
import { Word, GrPg } from './js/typeSprint';
import {
  answers, createMassFalse, groupPage, startFlag,
} from './js/clickFunctionSprint';
import { sprintDOM } from './js/sprintDOM';
import { getWords, buildMassSprint } from './js/requestSprint';
import { audioDOM, falseAnswersAudio, answersAudio } from './js/audioGameDOM';

export async function startSprint(flagStart:boolean, group:number, page:number):Promise<void> {
  // flagStart = true запуск из меню, false - запуск из учебника
  console.log(flagStart, group, page);
  startFlag.push(flagStart);
  const obj:GrPg = { group, page };
  groupPage.push(obj);
  await createMassFalse(group, page);
  if (flagStart) {
    const respMass:Word[] = await getWords(group, page);
    respMass.map((item) => answers.push(item));
    sprintDOM(respMass[0].word);
  } else {
    const newMass = await buildMassSprint(group, page);
    console.log('answers', answers);
    newMass.map((item) => answers.push(item));
    sprintDOM(newMass[0].word);
  }
}

async function startAudioGame():Promise<void> {
  const group = 5;
  const page = 0;
  const flagStart = true; // запуск из меню, false - запуск из учебника
  if (flagStart) {
    startFlag.push(flagStart);
    const obj:GrPg = { group, page };
    groupPage.push(obj);
    const falseMass = await getWords(group, page + 1);
    falseMass.map((item) => falseAnswersAudio.push(item));
    const respMass:Word[] = await getWords(group, page);
    respMass.map((item) => answersAudio.push(item));
    audioDOM(respMass[0]);
  }
}
