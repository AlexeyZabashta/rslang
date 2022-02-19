export type Word = {
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string
};

export type GrPg = {
  group:number,
  page: number
};

export type AuthUser = {
  message: string,
  name: string,
  refreshToken: string,
  token: string,
  userId: string
};
