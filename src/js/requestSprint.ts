import { Word, AuthUser } from './typeSprint';
import { IUserWordOptions, IaggregatedWord } from './data';
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
    // console.log(respAggrMass);
    if (respAggrMass.some((val) => val.word === item.word) === false) {
      return item;
    }
    return null;
  });
  // console.log('buildArr: ', buildArr);
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
    // console.log('ошибка в запросе', e);
  });
  const resp = await (await request as Response).json();
  return resp;
  /* .then(async (response) => {
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
  }); */
};

export async function checkGetWordStatus(group:number, page:number, idWord:string, val: boolean) {
  getWordUserSprint(idWord)
    .then((response) => {
      // console.log('Сработал updateUserWord');
      updateWordUserSprint(group, page, idWord, val, response);
    })
    .catch((error) => {
      console.clear();
      const e = new Error('error 404');
      // console.log('Сработал createUserWord', e);
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

/* type UserOptionalGen = {
  new: number,
  weak: number,
  percent: string
}; */

type UserOptionalGame = {
  percent: number,
  bestSer: number
};

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

type UserResponse = {
  [index: number] : UserCount
};

type UserCount = {
  paginatedResults: IaggregatedWord[],
  totalCount: TotalCount[]
};

type TotalCount = {
  count : number
};

export async function getAggrWordsUserGeneral(val:number) {
  const today = new Date().toLocaleDateString();
  const optionsVar:string[] = [
    `{"userWord.difficulty":"new"}, {"userWord.optional.learnDate":"${today}"}`, // всего новых слов
    `{"userWord.difficulty":"weak"}, {"userWord.optional.learnDate":"${today}"}`, // выучено за день
    `{"userWord.difficulty":"new"}, {"userWord.optional.learnDate":"${today}"}, {"userWord.optional.learnGame":"Sprint"}`, // новых слов в спринте
    `{"userWord.difficulty":"new"}, {"userWord.optional.learnDate":"${today}"}, {"userWord.optional.learnGame":"Audio"}`, // новых слов в аудио
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
  const resp:UserResponse = (await request.json());
  if (resp[0].totalCount.length) {
    return resp[0].totalCount[0].count;
  }
  return 0;
}

function middlePercSprint(newPer:number, oldPerc:UserStat) {
  if (oldPerc.optional.sprint) {
    const perc1 = newPer;
    const perc2 = oldPerc.optional.sprint.percent;

    return (perc1 + perc2) / 2;
  }
  return newPer;
}

function middlePercAudio(newPer:number, oldPerc:UserStat) {
  if (oldPerc.optional.audio) {
    const perc1 = newPer;
    const perc2 = oldPerc.optional.audio.percent;
    return Math.round((perc1 + perc2) / 2);
  }
  return Math.round(newPer);
}

async function requestUpdateUserSprint(newOptions:UserStat) {
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

export async function updateUserStatSprint(perc:number, ser:number, oldInfo:UserStat) {
  if (oldInfo.optional.audio) {
    const newOptions:UserStat = {
      learnedWords: 0,
      optional: {
        sprint: {
          percent: middlePercSprint(perc, oldInfo),
          bestSer: ser > (oldInfo.optional.sprint as UserOptionalGame).bestSer ? ser : (oldInfo.optional.sprint as UserOptionalGame).bestSer,
        },
        audio: {
          percent: oldInfo.optional.audio.percent,
          bestSer: oldInfo.optional.audio.bestSer,
        },
      },
    };
    requestUpdateUserSprint(newOptions);
  } else {
    const newOptions:UserStat = {
      learnedWords: 0,
      optional: {
        sprint: {
          percent: middlePercSprint(perc, oldInfo),
          bestSer: ser,
        },
      },
    };
    requestUpdateUserSprint(newOptions);
  }
}

export async function requestUpdateUserAudio(newOptions:UserStat) {
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

export async function updateUserStatAudio(perc:number, ser:number, oldInfo:UserStat) {
  if (oldInfo.optional.sprint) {
    const newOptions:UserStat = {
      learnedWords: 0,
      optional: {
        audio: {
          percent: middlePercAudio(perc, oldInfo),
          bestSer: ser > (oldInfo.optional.audio as UserOptionalGame).bestSer ? ser : (oldInfo.optional.audio as UserOptionalGame).bestSer,
        },
        sprint: {
          percent: oldInfo.optional.sprint.percent,
          bestSer: oldInfo.optional.sprint.bestSer,
        },
      },
    };
    requestUpdateUserAudio(newOptions);
  } else {
    const newOptions:UserStat = {
      learnedWords: 0,
      optional: {
        audio: {
          percent: middlePercAudio(perc, oldInfo),
          bestSer: ser,
        },
      },
    };
    requestUpdateUserAudio(newOptions);
  }
}

function createOptionSprint(perc:number, ser:number, val:boolean) {
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
  }
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

export async function createUserStat(perc:number, ser:number, val: boolean) {
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

export async function checkGetUserStatus(percent:number, bestSer:number) {
  getUserStat()
    .then((response) => {
      // console.log('Сработал updateUserWord');
      if (gameFlag[0]) {
        updateUserStatSprint(percent, bestSer, response);
      } else {
        updateUserStatAudio(percent, bestSer, response);
      }
    })
    .catch((error) => {
      console.clear();
      const e = new Error('error 404');
      // console.log('Сработал createUserWord', e);
      if (gameFlag[0]) {
        createUserStat(percent, bestSer, true);
      } else {
        createUserStat(percent, bestSer, false);
      }
    });
}

export async function checkGetUserOptions(): Promise<boolean | UserStat> {
  let out:boolean | UserStat;
  return getUserStat()
    .then((response) => {
      out = response;
      return out;
    })
    .catch((error) => {
      console.clear();
      const e = new Error('error 404');
      // console.log('Сработал createUserWord', e);
      out = false;
      return out;
    });
}

export async function createStatField(val:number) {
  const massId:string[] = ['perc_date', 'perc_date_sprint', 'best_series_sprint',
    'perc_date_audio', 'best_series_audio'];
  const info = await checkGetUserOptions();
  if (info) {
    if (val === 0) {
      if ((info as UserStat).optional.audio && (info as UserStat).optional.sprint) {
        const percAud = (info as UserStat).optional.audio?.percent;
        const percSpr = (info as UserStat).optional.sprint?.percent;
        const middlePer = Math.round(((percAud as number) + (percSpr as number)) / 2);
        return `${middlePer}`;
      }
      if ((info as UserStat).optional.audio) {
        return (info as UserStat).optional.audio?.percent.toFixed(0);
      }
      if ((info as UserStat).optional.sprint) {
        return (info as UserStat).optional.sprint?.percent.toFixed(0);
      }
    }
    if (val === 1) {
      if ((info as UserStat).optional.sprint?.percent) {
        return (info as UserStat).optional.sprint?.percent.toFixed(0);
      }
      return 0;
    }
    if (val === 2) {
      if ((info as UserStat).optional.sprint?.bestSer) {
        return (info as UserStat).optional.sprint?.bestSer;
      }
      return 0;
    }
    if (val === 3) {
      if ((info as UserStat).optional.audio?.percent) {
        return (info as UserStat).optional.audio?.percent.toFixed(0);
      }
      return 0;
    }
    if (val === 4) {
      if ((info as UserStat).optional.audio?.bestSer) {
        return (info as UserStat).optional.audio?.bestSer;
      }
      return 0;
    }
  }
  return 0;
}

export async function putUserStat() {
  const newOptions:UserStat = {
    learnedWords: 0,
    optional: {
      audio: {
        percent: 0,
        bestSer: 0,
      },
      sprint: {
        percent: 0,
        bestSer: 0,
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
