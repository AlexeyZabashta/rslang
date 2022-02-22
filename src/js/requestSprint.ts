import { Word, AuthUser } from './typeSprint';
import { IUserWordOptions } from './data';
import { gameFlag } from '../indexGame';

export const getWordsMiniGame = async (group:number, page:number) => {
  const request:Response = await fetch(`https://alexrslangproject.herokuapp.com/words?page=${page}&group=${group}`, {
    method: 'GET',
  });
  const resp:Word[] = await request.json();
  // console.log(resp);
  return resp;
};

export async function getAggrWordsMiniGame(group:number, page:number) {
  const data:AuthUser = JSON.parse(String(localStorage.getItem('userData')));
  const request = await fetch(`https://alexrslangproject.herokuapp.com/users/${data.userId}/aggregatedWords?&filter={"$and":[{"group": ${group}},{"page": ${page}},{"userWord.difficulty":"weak"}]}&wordsPerPage=20`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const resp:Word[] = (await request.json())[0].paginatedResults;
  // console.log('response Aggr Words', resp);
  return resp;
}

export async function buildMassSprint(group:number, page:number): Promise<Word[]> {
  const respMass:Word[] = await getWordsMiniGame(group, page);
  const respAggrMass:Word[] = await getAggrWordsMiniGame(group, page);

  const buildArr:Word[] = respMass.filter((item) => {
    console.log(respAggrMass);
    if (respAggrMass.some((val) => val.word === item.word) === false) {
      return item;
    }
    return null;
  });
  console.log('buildArr: ', buildArr);
  return buildArr;
}

function checkUserWordDiff(oldUserWord:IUserWordOptions, val:boolean) {
  const newAnswSer = (oldUserWord.optional.answSeries as number) + 1;
  if (val) {
    if ((oldUserWord.difficulty === 'new') && newAnswSer === 3) {
      return { diff: 'weak', ser: 0 };
    }
    if ((oldUserWord.difficulty === 'hard') && newAnswSer === 5) {
      return { diff: 'weak', ser: 0 };
    }
    return { diff: oldUserWord.difficulty, ser: newAnswSer };
  }
  return { diff: 'hard', ser: 0 };
}

function checkLearnDate(newDiff:DiffType, oldUserWord:IUserWordOptions) {
  if (newDiff.diff === oldUserWord.difficulty) {
    return (oldUserWord.optional.learnDate as string);
  }
  return new Date().toLocaleDateString();
}

function checkLearnGame(newDiff:DiffType, oldUserWord:IUserWordOptions) {
  if (newDiff.diff !== oldUserWord.difficulty) {
    const game = gameFlag[0] ? 'Sprint' : 'Audio';
    return game;
  }
  return oldUserWord.optional.learnGame;
}

export const updateWordUserSprint = async (group:number, page:number, idWord:string, val: boolean, oldUserWord:IUserWordOptions) => {
  const newDiff = (checkUserWordDiff(oldUserWord, val) as DiffType);
  const newOptions:IUserWordOptions = {
    difficulty: newDiff.diff,
    optional: {
      group: `${group}`,
      groupPage: `${page}`,
      trueAnsw: val ? (oldUserWord.optional.trueAnsw as number) + 1 : oldUserWord.optional.trueAnsw,
      falseAnsw: !val ? (oldUserWord.optional.falseAnsw as number) + 1 : oldUserWord.optional.falseAnsw,
      answSeries: newDiff.ser,
      learnDate: checkLearnDate(newDiff, oldUserWord),
      learnGame: checkLearnGame(newDiff, oldUserWord),
    },
  };
  const data:AuthUser = JSON.parse(String(localStorage.getItem('userData')));
  const request:Response = await fetch(`https://alexrslangproject.herokuapp.com/users/${data.userId}/words/${idWord}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${data.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newOptions),
  });
};

type DiffType = {
  diff: string,
  ser: number
};

export const createWordUserSprint = async (group:number, page:number, idWord:string, val: boolean) => {
  const newOptions:IUserWordOptions = {
    difficulty: val ? 'new' : 'hard',
    optional: {
      group: `${group}`,
      groupPage: `${page}`,
      trueAnsw: val ? 1 : 0,
      falseAnsw: !val ? 1 : 0,
      answSeries: val ? 1 : 0,
      learnDate: new Date().toLocaleDateString(),
      learnGame: gameFlag[0] ? 'Sprint' : 'Audio',
    },
  };
  const data:AuthUser = JSON.parse(String(localStorage.getItem('userData')));
  const request:Response = await fetch(`https://alexrslangproject.herokuapp.com/users/${data.userId}/words/${idWord}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${data.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newOptions),
  });
};

export const getWordUserSprint = async (idWord:string) => {
  // console.log(idWord);
  const data:AuthUser = JSON.parse(String(localStorage.getItem('userData')));
  const request:Promise<void | Response> = fetch(`https://alexrslangproject.herokuapp.com/users/${data.userId}/words/${idWord}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).catch((error) => {
    const e = new Error('error 404 userword');
    console.log('ошибка в запросе', e);
  });
  const resp = await (await request as Response).json();
  return resp;
  /*.then(async (response) => {
    console.log(response);
    if (response.status === 200) {
      console.log('Сработал updateUserWord');
      const resp: IUserWordOptions = await (response as Response).json();
      updateWordUserSprint(group, page, idWord, val, resp);
      return 'sucsess';
    } else {
      console.log('Сработал createUserWord');
      createWordUserSprint(group, page, idWord, val);
      return 'sucsess';
    }
  });*/
};


export async function checkGetWordStatus(group:number, page:number, idWord:string, val: boolean) {
  getWordUserSprint(idWord)
    .then((response) => {      
      console.log('Сработал updateUserWord');    
      updateWordUserSprint(group, page, idWord, val, response);
    })
    .catch((error) => {
      console.clear();
      const e = new Error('error 404');
      console.log('Сработал createUserWord', e);
      createWordUserSprint(group, page, idWord, val);
    });
}

type UserStat = {
  learnedWords: number,
  optional: UserOptional
};

type UserOptional = {  
  sprint?: UserOptionalGame,
  audio?: UserOptionalGame
};

/*type UserOptionalGen = {
  new: number,
  weak: number,
  percent: string
};*/

type UserOptionalGame = {  
  percent: string,
  bestSer: number
};


export async function getAggrWordsUserGeneral(val:number) {
  const today = new Date().toLocaleDateString();
  const optionsVar:string[] = [
    `{"userWord.difficulty":"new"}, {"userWord.optional.learnDate":"${today}"}`, //всего новых слов
    `{"userWord.difficulty":"weak"}, {"userWord.optional.learnDate":"${today}"}`, //выучено за день
    `{"userWord.difficulty":"new"}, {"userWord.optional.learnDate":"${today}"}, {"userWord.optional.learnGame":"Sprint"}`, //новых слов в спринте
    `{"userWord.difficulty":"new"}, {"userWord.optional.learnDate":"${today}"}, {"userWord.optional.learnGame":"Audio"}`, //новых слов в аудио
  ]; 
  const data:AuthUser = JSON.parse(String(localStorage.getItem('userData')));
      
  const request = await fetch(`https://alexrslangproject.herokuapp.com/users/${data.userId}/aggregatedWords?&filter={"$and":[${optionsVar[val]}]}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const resp:Word[] = (await request.json())[0].paginatedResults;
  console.log('response getAggrWordsUserGeneral', resp.length, resp);
  return resp.length;
}



export async function checkGetUserStatus(percent:string, bestSer:number) {
  getUserStat()
    .then((response) => {      
      console.log('Сработал updateUserWord');    
      if (gameFlag[0]) {
        updateUserStatSprint(percent, bestSer, response);
      } else {
        updateUserStatAudio(percent, bestSer, response);
      }
    })
    .catch((error) => {
      console.clear();
      const e = new Error('error 404');
      console.log('Сработал createUserWord', e);
      if (gameFlag[0]) {
        createUserStat(percent, bestSer, true);
      } else {
        createUserStat(percent, bestSer, false);
      }
    });
}

/*export async function checkGetUserOptions() {
  getUserStat()
    .then((response) => {      
      
    })
    .catch((error) => {
      console.clear();
      const e = new Error('error 404');
      console.log('Сработал createUserWord', e);
      if (gameFlag[0]) {
        createUserStat(percent, bestSer, true);
      } else {
        createUserStat(percent, bestSer, false);
      }
    });
}*/



export async function getUserStat() {
  const data:AuthUser = JSON.parse(String(localStorage.getItem('userData')));
  const request = await fetch(`https://alexrslangproject.herokuapp.com/users/${data.userId}/statistics`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const resp:UserStat = await request.json();
  return resp;
}

function middlePerc(newPer:string, oldPerc:UserStat) {
  if (oldPerc.optional.sprint) {
    const perc1 = parseInt(newPer);
    const perc2 = parseInt(oldPerc.optional.sprint.percent);
    return `${(perc1 + perc2) / 2}%`
  }
  return newPer;
}


export async function updateUserStatSprint(perc:string, ser:number, oldInfo:UserStat) {
  const newOptions:UserStat = {
    learnedWords: 0,
    optional: {      
      sprint: {        
        percent: middlePerc(perc, oldInfo),
        bestSer: ser,
      },      
    },
  };
  const data:AuthUser = JSON.parse(String(localStorage.getItem('userData')));
  const request = await fetch(`https://alexrslangproject.herokuapp.com/users/${data.userId}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${data.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newOptions),
  });   
}

export async function updateUserStatAudio(perc:string, ser:number, oldInfo:UserStat) {
  const newOptions:UserStat = {
    learnedWords: 0,
    optional: {      
      audio: {        
        percent: middlePerc(perc, oldInfo),
        bestSer: ser,
      },      
    },
  };
  const data:AuthUser = JSON.parse(String(localStorage.getItem('userData')));
  const request = await fetch(`https://alexrslangproject.herokuapp.com/users/${data.userId}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${data.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newOptions),
  });   
}

function createOptionSprint(perc:string, ser:number, val:boolean) {
  if (val) {
    return {
      learnedWords: 0,
      optional: {      
        sprint: {        
          percent: perc,
          bestSer: ser,
        },      
      },
    };
  } else {
    return {
      learnedWords: 0,
      optional: {      
        audio: {        
          percent: perc,
          bestSer: ser,
        },      
      },
    };
  }  
}


export async function createUserStat(perc:string, ser:number, val: boolean) { 
  const newOptions:UserStat = createOptionSprint(perc, ser, val);  
  const data:AuthUser = JSON.parse(String(localStorage.getItem('userData')));
  const request = await fetch(`https://alexrslangproject.herokuapp.com/users/${data.userId}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${data.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newOptions),
  });   
}








