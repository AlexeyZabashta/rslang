import {
  Iwords, IauthorisedUser, IUserWordOptions, IUserWord,
} from './data';

export const getWords = async () => {
  let group = 0;
  let groupPage = 0;

  if (localStorage.getItem('group')) group = Number(localStorage.getItem('group'));
  if (localStorage.getItem('groupPage')) groupPage = Number(localStorage.getItem('groupPage'));
  if (localStorage.getItem('group') === null) { localStorage.setItem('group', '0'); }
  if (localStorage.getItem('groupPage') === null) { localStorage.setItem('groupPage', '0'); }

  const request:Response = await fetch(`http://localhost:2020/words?page=${groupPage}&group=${group}`, {
    method: 'GET',
  });
  const wordsResponse: Iwords[] = await request.json();
  return wordsResponse;
};

const playWord = async (wordId: string) => {
  // Отключаем аудиокнопи на время воспроизведения
  const playWordsBtns = document.querySelectorAll(
    '.textbook-play[data-audioplay]',
  ) as NodeListOf<HTMLButtonElement>;
  playWordsBtns.forEach(async (button, i: number) => {
    button.disabled = true;
  });

  const audioPlayer = document.querySelector('.textbook-player') as HTMLAudioElement;

  const request:Response = await fetch(`http://localhost:2020/words/${wordId}`, {
    method: 'GET',
  });
  const curWordResponse: Iwords = await request.json();

  const playList = [
    `http://localhost:2020/${curWordResponse.audio}`,
    `http://localhost:2020/${curWordResponse.audioExample}`,
    `http://localhost:2020/${curWordResponse.audioMeaning}`,
  ];
  console.log(`playList = ${playList}`);
  audioPlayer.src = `http://localhost:2020/${curWordResponse.audio}`;

  let track = 0;

  //  Функция для включения треков

  function playAudioFile() {
    //  Функция для переключения треков
    function switchTrack(numtrack: number) {
      // Меняем значение атрибута src аудиоплейра
      audioPlayer.src = `${playList[numtrack]}`;
      // console.log(`следующий трек = ${audioPlayer.src}`);
      // Назначаем время аудиофайла ноль
      audioPlayer.currentTime = 0;
      // Включаем аудиофайл
      playAudioFile();
    }
    // Запускаем аудиофайл
    audioPlayer.play();
    // Запуск интервала
    const audioPlay = setInterval(() => {
      // И проверяем что переменная track меньше длинны плейлиста
      if (
        audioPlayer.currentTime === audioPlayer.duration
        && track < playList.length - 1
      ) {
        track++;
        switchTrack(track); // Включаем следующий аудиофайл
      } else if (
        audioPlayer.currentTime === audioPlayer.duration
        && track === playList.length - 1
      ) {
        audioPlayer.pause();
        clearInterval(audioPlay);
        playWordsBtns.forEach(async (button, i: number) => {
          button.disabled = false;
        });
      }
    }, 200);
  }
  playAudioFile();
};

export const renderTextbookPage = async () => {
  console.log('Отрисовываю страницу TextbookPage');

  const pageWords: Iwords[] = await getWords();
  // console.log(pageWords);
  // console.log(pageWords[0].word);

  const mainHtml = document.querySelector('.main') as HTMLElement;
  mainHtml.innerHTML = '';
  mainHtml.innerHTML = `<section class="textbook">
      <div class="textbook-wrapper">
        <div class="textbook-pagination">
          <button class="textbook-prev_btn">Prev</button>
          <select name="textbook-select" id="textbook-select">            
          </select>
          <button class="textbook-nex_tbtn">Next</button>
          <button class="textbook-audio_btn">Audio challenge</button>
          <button class="textbook-sprint_btn">Sprint</button>
        </div>
        <div class="textbook-list">      
        </div>
      </div>
      <audio class="textbook-player">        
      </audio>
    </section> 
    `;

  // ----- Рендерю блок Select
  const selectedPage = document.getElementById('textbook-select') as HTMLSelectElement;
  let pageOptionStr = '';
  const groupPage = Number(localStorage.getItem('groupPage'));
  for (let i = 0; i < 30; i += 1) {
    if (groupPage === i) pageOptionStr += `<option value="${i}" selected>Page ${i + 1}</option>`;
    else pageOptionStr += `<option value="${i}">Page ${i + 1}</option>`;
  }
  selectedPage.innerHTML = `${pageOptionStr}`;

  // ----- Рендерю карточки со словами

  const textbookPage = document.querySelector('.textbook-list') as HTMLElement;
  pageWords.forEach((elem: Iwords, index: number) => {
    const wordCard = document.createElement('div');
    wordCard.classList.add('textbook-item');
    // console.log(elem);
    // wordCard.style.backgroundImage = `url('http://localhost:2020/${elem.image}')`;
    wordCard.innerHTML = `<div class="textbook-item_picture">
      <img class="textbook-item_img" src=http://localhost:2020/${elem.image}>
    </div>
    <div class="textbook-item_article">
    <span class="textbook-word">${elem.word}</span>
    <span class="textbook-word_transcription">${elem.transcription}</span>
    <span class="textbook-word_translate">${elem.wordTranslate}</span>
    <button class="textbook-play" data-audioplay='${elem.id}'></button>
    </div>
    <div class="textbook-item_article">
    <span class="textbook-example">${elem.textExample} - </span>    
    <span class="textbook-example_translate">${elem.textExampleTranslate}</span>
    </div>
    <div class="textbook-item_article">
    <span class="textbook-meaning">${elem.textMeaning} - </span>
    <span class="textbook-meaning_translate">${elem.textMeaningTranslate}</span>
    </div>
    <div class="textbook-btns_wrapper">
      <button class="word-btn learned-word" data-learned='${elem.id}'>Learn</button>
      <button class="word-btn difficult-word" data-difficult='${elem.id}'>Difficult</button>
    </div>
    <div class="textbook-word_blur"></div>
    `;

    textbookPage.append(wordCard);
  });

  // ----- Функция переключения страниц

  const wichPage = async (step: number) => {
    const oldPage = Number(localStorage.getItem('groupPage'));
    const oldGroup = Number(localStorage.getItem('group'));

    let newPage = oldPage + step;
    const newGroup = oldGroup;
    if (newPage < 0) newPage = 0;
    if (newPage > 29) newPage = 29;
    localStorage.setItem('group', String(newGroup));
    localStorage.setItem('groupPage', String(newPage));
    renderTextbookPage();
  };

  const prevBtn = document.querySelector('.textbook-prev_btn') as HTMLButtonElement;
  prevBtn.addEventListener('click', () => {
    wichPage(-1);
  });

  selectedPage.addEventListener('change', () => {
    localStorage.setItem('groupPage', String(selectedPage.value));
    console.log(selectedPage.selectedIndex);
    selectedPage.options[selectedPage.selectedIndex].selected = true;
    renderTextbookPage();
  });

  const nextBtn = document.querySelector('.textbook-nex_tbtn') as HTMLButtonElement;
  nextBtn.addEventListener('click', () => {
    wichPage(1);
  });

  // ----- Функция запуска проигрывания  произношения

  const playWordsBtns = document.querySelectorAll(
    '.textbook-play[data-audioplay]',
  ) as NodeListOf<HTMLButtonElement>;

  playWordsBtns.forEach(async (button, i: number) => {
    button.addEventListener('click', () => {
      const currWordId = String((button as HTMLButtonElement).dataset.audioplay);
      // const playWordBtn = document.querySelector(`.textbook-play[data-audioplay="${currWordId}"]`) as HTMLButtonElement;
      console.log(currWordId);
      playWord(currWordId);
    });
  });

  //= ======= Логика кнопок  Learn и Difficult =====================

  const learnBtns = document.querySelectorAll(
    '.learned-word[data-learned]',
  ) as NodeListOf<HTMLButtonElement>;
  const difficultBtns = document.querySelectorAll(
    '.difficulty-word[data-difficulty]',
  ) as NodeListOf<HTMLButtonElement>;

  const group = Number(localStorage.getItem('group'));
  const getUserFromLS = await String(localStorage.getItem('userData'));
  const getauthentData: IauthorisedUser = JSON.parse(getUserFromLS);
  const { userId } = getauthentData;
  const userToken: string = getauthentData.token;

  const createUserWord = async (wordId: string, word: IUserWordOptions) => {
    const rawResponse = await fetch(`http://localhost:2020/users/${userId}/words/${wordId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getauthentData.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    });
    const content: IUserWord = await rawResponse.json();
    console.log(content);
  };

  const updateUserWord = async (wordId: string, word: IUserWordOptions) => {
    const rawResponse = await fetch(`http://localhost:2020/users/${userId}/words/${wordId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getauthentData.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    });
    const content: IUserWord = await rawResponse.json();
    console.log(content);
  };

  const getUserWord = async (wordId: string, token: string, word: IUserWordOptions) => {
    const request = await fetch(`http://localhost:2020/users/${userId}/words/${wordId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        console.log('request', response.status);

        if (response.status === 200) {
          console.log('Сработал updateUserWord');
          updateUserWord(wordId, word);
        } else {
          console.log('Сработал createUserWord');
          createUserWord(wordId, word);
        }
      });
  };

  difficultBtns.forEach(async (diffButton) => {
    diffButton.addEventListener('click', async () => {
      const currDifficultId = String((diffButton as HTMLButtonElement).dataset.difficult);
      diffButton.classList.toggle('_difficult');

      let learnBtnStatus = false;
      let diffBtnStatus = 'weak';

      const currLearnedBtn = document.querySelector(`.learned-word[data-learned='${currDifficultId}']`) as HTMLButtonElement;
      if (currLearnedBtn.classList.contains('_learned')) learnBtnStatus = true;
      if (diffButton.classList.contains('_difficult')) diffBtnStatus = 'hard';

      // ------Запускаем проверку на наличие такого слова в userWords

      const isUserWord = await getUserWord(currDifficultId, userToken, { difficulty: diffBtnStatus, optional: { group: String(group), groupPage: String(groupPage), learned: learnBtnStatus } });
      console.log(isUserWord);
    });
  });

  learnBtns.forEach(async (learnButton) => {
    learnButton.addEventListener('click', async () => {
      const currLearnedId = String((learnButton as HTMLButtonElement).dataset.learned);
      learnButton.classList.toggle('_learned');

      let learnBtnStatus = false;
      let diffBtnStatus = 'weak';

      const curdiffButton = document.querySelector(`.difficult-word[data-difficult='${currLearnedId}']`) as HTMLButtonElement;
      if (curdiffButton.classList.contains('_difficult')) diffBtnStatus = 'hard';
      if (learnButton.classList.contains('_learned')) learnBtnStatus = true;

      // ------Запускаем проверку на наличие такого слова в userWords

      const isUserWord = await getUserWord(currLearnedId, userToken, { difficulty: diffBtnStatus, optional: { group: String(group), groupPage: String(groupPage), learned: learnBtnStatus } });
      console.log(isUserWord);
    });
  });

  difficultBtns.forEach(async (diffButton, i: number) => {
    diffButton.addEventListener('click', async () => {
      const currDifficultId = String((diffButton as HTMLButtonElement).dataset.difficult);
      diffButton.classList.toggle('_difficult');

      let learnBtnStatus = false;
      let diffBtnStatus = 'weak';

      const currLearnedBtn = document.querySelector(`.learned-word[data-learned='${currDifficultId}']`) as HTMLButtonElement;
      if (currLearnedBtn.classList.contains('_learned')) learnBtnStatus = true;
      if (diffButton.classList.contains('_difficult')) diffBtnStatus = 'hard';

      // ------Запускаем проверку на наличие такого слова в userWords

      const isUserWord = await getUserWord(currDifficultId, userToken, { difficulty: diffBtnStatus, optional: { group: String(group), groupPage: String(groupPage), learned: learnBtnStatus } });
      console.log(isUserWord);
    });
  });

  /*
  const learnedWord = document.querySelector('.learned-word') as HTMLButtonElement;
  learnedWord.addEventListener('click', async() => {
    const getUserFromLS = await String(localStorage.getItem('userData'));
    const getauthentData:IauthorisedUser = JSON.parse(getUserFromLS);
    console.log('getauthentData', getauthentData);
    console.log('token = ', getauthentData.token);

*/

  const audioGame = document.querySelector('.textbook-audio_btn') as HTMLButtonElement;
  const sprintGame = document.querySelector('.textbook-sprint_btn') as HTMLButtonElement;
};
