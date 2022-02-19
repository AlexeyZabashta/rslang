import { Word, AuthUser } from './typeSprint';

export const getWords = async (group:number, page:number) => {
  const request:Response = await fetch(`http://localhost:2020/words?page=${page}&group=${group}`, {
    method: 'GET',
  });
  const resp:Word[] = await request.json();
  // console.log(resp);
  return resp;
};

export async function getAggrWords(group:number, page:number) {
  const data:AuthUser = JSON.parse(String(localStorage.getItem('userData')));
  const request = await fetch(`http://localhost:2020/users/${data.userId}/aggregatedWords?&filter={"$and":[{"group": ${group}},{"page": ${page}},{"userWord.difficulty":"hard"}]}&wordsPerPage=20`, {
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

export async function buildMassSprint(group:number, page:number): Promise<Word[]> {
  const respMass:Word[] = await getWords(group, page);
  const respAggrMass:Word[] = await getAggrWords(group, page);

  const buildArr:Word[] = respMass.filter((item) => {
    if (respAggrMass.some((val) => val.word === item.word) === false) {
      return item;
    }
    return null;
  });
  return buildArr;
}

export const getWordUserSprint = async (group:number, page:number, idWord:string) => {
  const data:AuthUser = JSON.parse(String(localStorage.getItem('userData')));
  const request:Response = await fetch(`http://localhost:2020/users/${data.userId}/words/${idWord}`, {
    method: 'GET',
  });
  const resp:Word[] = await request.json();
  // console.log(resp);
  return resp;
};

export const createtWordUserSprint = async (word:Word) => {
  const data:AuthUser = JSON.parse(String(localStorage.getItem('userData')));
  const request:Response = await fetch(`http://localhost:2020/users/${data.userId}/words/${word.id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${data.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
  const resp:Word[] = await request.json();
  // console.log(resp);
  return resp;
};