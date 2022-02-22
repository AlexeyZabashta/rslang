import { Word, AuthUser } from './typeSprint';
import { IUserWordOptions } from './data';

export const getWordsMiniGame = async (group:number, page:number) => {
  const request:Response = await fetch(`http://alexrslangproject.herokuapp.com/words?page=${page}&group=${group}`, {
    method: 'GET',
  });
  const resp:Word[] = await request.json();
  // console.log(resp);
  return resp;
};

export async function getAggrWordsMiniGame(group:number, page:number) {
  const data:AuthUser = JSON.parse(String(localStorage.getItem('userData')));
  const request = await fetch(`http://alexrslangproject.herokuapp.com/users/${data.userId}/aggregatedWords?&filter={"$and":[{"group": ${group}},{"page": ${page}},{"userWord.difficulty":"weak"}]}&wordsPerPage=20`, {
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
  if (newDiff.diff !== 'weak') {
    return (oldUserWord.optional.learnGame as string);
  }
  return newDiff.diff;
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
  const request:Response = await fetch(`http://alexrslangproject.herokuapp.com/users/${data.userId}/words/${idWord}`, {
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
      learnGame: ' ',
    },
  };
  const data:AuthUser = JSON.parse(String(localStorage.getItem('userData')));
  const request:Response = await fetch(`http://alexrslangproject.herokuapp.com/users/${data.userId}/words/${idWord}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${data.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newOptions),
  });
};

export const getWordUserSprint = async (group:number, page:number, idWord:string, val: boolean) => {
  // console.log(idWord);
  const data:AuthUser = JSON.parse(String(localStorage.getItem('userData')));
  const request:Response | void = await fetch(`http://alexrslangproject.herokuapp.com/users/${data.userId}/words/${idWord}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(async (response) => {
    if (response.status === 200) {
      console.log('Сработал updateUserWord');
      const resp: IUserWordOptions = await (response as Response).json();
      updateWordUserSprint(group, page, idWord, val, resp);
      console.log();
    } else {
      console.log('Сработал createUserWord');
      createWordUserSprint(group, page, idWord, val);
    }
  });
};

export async function getAggrWordsTest(group:number, page:number) {
  const data:AuthUser = JSON.parse(String(localStorage.getItem('userData')));
  const request = await fetch(`http://alexrslangproject.herokuapp.com/users/${data.userId}/aggregatedWords?&filter={"$and":[{"group": ${group}},{"page": ${page}}]}&wordsPerPage=20`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${data.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const resp:Word[] = (await request.json())[0].paginatedResults;
  console.log('response Aggr Words', resp);
  return resp;
}
