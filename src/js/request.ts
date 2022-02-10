import { Word } from './type';

export const getWords = async (group:number, page:number) => {
  const request:Response = await fetch(`http://localhost:2020/words?page=${page}&group=${group}`, {
    method: 'GET',
  });   
  const resp:Word[] = await request.json(); 
  console.log(resp);
  return resp;
};