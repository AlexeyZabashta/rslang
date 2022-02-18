export const bodyHtml = document.querySelector('.body') as HTMLElement;

export interface Iwords {
  audio: string
  audioExample: string
  audioMeaning: string
  group: number
  id: string
  image: string
  page: number
  textExample: string
  textExampleTranslate: string
  textMeaning: string
  textMeaningTranslate: string
  transcription: string
  word: string
  wordTranslate: string
}

export interface Iuser {
  name: string,
  email: string,
  password: string
}

export interface IauthorisedUser {
  message: string,
  name: string,
  refreshToken: string,
  token: string,
  userId: string
}

export interface IUserWordOptions {
  difficulty: string,
  optional: {
    group: string,
    groupPage: string,
    trueAnsw: number,
    falseAnsw: number
  }
}

export interface IUserWord {
  userId: string,
  wordId: string,
  word: IUserWordOptions
}
