import { Word, GrPg } from './type';
import { checkBonus } from './bonusAlg';
import { getWords } from './request';

export const answers:Word[] = [];
export const groupPage:GrPg[] = [];
export const startFlag:boolean[] = [];
let answersFalse:Word[] = [];
let answersIndex = 0;
let answerFlag:boolean;

function randomDiap(min:number, max:number){  
  const rndGroup = Math.floor(Math.random() * (max - min + 1)) + min;  
  return rndGroup;
}

export async function answerVariant() {
  const rnd = Math.round(Math.random());
  if (rnd === 1) {
    answerFlag = true;
    return answers[answersIndex].wordTranslate;
  }
  answerFlag = false;
  return answersFalse[randomDiap(0, 19)].wordTranslate;
}


async function newWordDOM() {
  const englWord = document.querySelector('.engl_word') as HTMLElement;
  const translWord = document.querySelector('.translate_engl_word') as HTMLElement;
  englWord.textContent = answers[answersIndex].word;
  translWord.textContent = await answerVariant();
}


export async function falseAnsw() {
  const answer = document.querySelector('.answ_result_false') as HTMLElement;
  answer.classList.add('click'); 
  answer.ontransitionend = function () {
    answer.classList.remove('click');
  };
}

export async function trueAnsw() {
  const answer = document.querySelector('.answ_result_right') as HTMLElement;
  answer.classList.add('click');  
  answer.ontransitionend = function () {
    answer.classList.remove('click');
  };
}

function checkPage(page:number):number{  
  if (page > 0) {
    const newPage = page - 1;
    return newPage;
  } 
  const newPage = 29;
  return newPage;  
}

export async function createMassFalse(group:number, page:number) {
  if (group < 5) {
    answersFalse = await getWords(group + 1, page);
  } else {
    answersFalse = await getWords(group - 1, page);
  }
}

async function checkIndex() {
  const page:number = groupPage[0].page;
  const group:number = groupPage[0].group;  
  if (answersIndex < 19) {
    answersIndex += 1;
  } else {
    answersIndex = 0;
    answers.length = 0;
    const newPage:number = checkPage(page);
    const newAnsw = await getWords(group, newPage);
    newAnsw.map((item)=>answers.push(item));
    await createMassFalse(group, newPage);
    newWordDOM();       
  }
}

export async function checkAnsw(val:boolean) {
  console.log('val: ', val, 'answerFlag: ', answerFlag);
  console.log('if result: ', val === answerFlag);
  if (answerFlag === val) {
    trueAnsw();
    checkBonus(true);
  } else {
    checkBonus(false);
    falseAnsw();
  }
  await checkIndex();    
  newWordDOM();
}






