import './style.css';
import { Word, GrPg } from './js/type';
import { answers, createMassFalse, groupPage, startFlag } from './js/clickFunction';
import { renderDOM } from './js/renderDOM';
import { getWords } from './js/request';



async function startApp():Promise<void> {
  const group = 5;
  const page = 0;
  const flagStart = true; // запуск из меню, false - запуск из учебника
  startFlag.push(flagStart);
  const obj:GrPg = { group: group, page: page };
  groupPage.push(obj);
  createMassFalse(group, page);
  const respMass:Word[] = await getWords(group, page);
  respMass.map((item) => answers.push(item));
  renderDOM(respMass[0].word); 
}

startApp();

