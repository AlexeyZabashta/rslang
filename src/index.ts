import './style.css';
import { Word, GrPg } from './js/typeSprint';
import { answers, createMassFalse, groupPage, startFlag } from './js/clickFunctionSprint';
import { gameTimer } from './js/bonusAlgSprint';
import { sprintDOM } from './js/sprintDOM';
import { getWords } from './js/requestSprint';
import { audioDOM } from './js/audioGameDOM';
import { answersAudio } from './js/audioGameAlg';
import { falseAnswersAudio } from './js/audioGameDOM';



async function startSprint():Promise<void> {  
  const group = 5;
  const page = 0;
  const flagStart = true; // запуск из меню, false - запуск из учебника
  startFlag.push(flagStart);
  const obj:GrPg = { group: group, page: page };
  groupPage.push(obj);
  createMassFalse(group, page);
  const respMass:Word[] = await getWords(group, page);
  respMass.map((item) => answers.push(item));
  sprintDOM(respMass[0].word);  
}

async function startAudioGame():Promise<void> {  
  const group = 5;
  const page = 0;
  const flagStart = true; // запуск из меню, false - запуск из учебника
  startFlag.push(flagStart);
  const obj:GrPg = { group: group, page: page };
  groupPage.push(obj);
  const falseMass = await getWords(group, page + 1);
  falseMass.map((item) => falseAnswersAudio.push(item));  
  const respMass:Word[] = await getWords(group, page);
  respMass.map((item) => answersAudio.push(item));  
  audioDOM(respMass[0]);  
}

startAudioGame();

//startSprint();

