import {
  baseUrl, Iword, IauthorisedUser, IUserWordOptions, IUserWord,
  IaggregatedWord,
} from './data';

export const getWords = async () => {
  let group = 0;
  let groupPage = 0;

  if (localStorage.getItem('group')) group = Number(localStorage.getItem('group'));
  if (localStorage.getItem('groupPage')) groupPage = Number(localStorage.getItem('groupPage'));
  if (localStorage.getItem('group') === null) { localStorage.setItem('group', '0'); }
  if (localStorage.getItem('groupPage') === null) { localStorage.setItem('groupPage', '0'); }

  const request:Response = await fetch(`${baseUrl}/words?page=${groupPage}&group=${group}`, {
    method: 'GET',
  });
  const wordsResponse: Iword[] = await request.json();
  return wordsResponse;
};

const getAllHardUserWords = async () => {
  const getUserFromLS = await String(localStorage.getItem('userData'));
  const getauthentData: IauthorisedUser = JSON.parse(getUserFromLS);
  const { userId } = getauthentData;
  const userToken: string = getauthentData.token;

  const request = await fetch(`${baseUrl}/users/${userId}/aggregatedWords?filter={"userWord.difficulty":"hard"}&wordsPerPage=3600`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  // .then(async (response) => {
  const hardWordsResponse = await request.json();
  const hardWordsArr: IaggregatedWord[] = await hardWordsResponse[0].paginatedResults;
  console.log('AllHardUserWords', hardWordsArr);
  return hardWordsArr;
  // })
  /*
    .catch(async (error) => {
      // console.log('catch(error');
      if (error.status === 402) {
        console.log('getUserWord. Error 402 Access token is missing or invalid');
      // error.message; // 'An error has occurred: 404'
      }
    });
    */
};

const getCurrPageUserWords = async () => {
  const getUserFromLS = await String(localStorage.getItem('userData'));
  const getauthentData: IauthorisedUser = JSON.parse(getUserFromLS);
  const { userId } = getauthentData;
  const userToken: string = getauthentData.token;
  let group = 0;
  let groupPage = 0;
  if (localStorage.getItem('group')) group = Number(localStorage.getItem('group'));
  if (localStorage.getItem('groupPage')) groupPage = Number(localStorage.getItem('groupPage'));

  console.log('group', group);
  console.log('groupPage', groupPage);

  const request = await fetch(`${baseUrl}/users/${userId}/aggregatedWords?&filter={"$and":[{"group": ${group}},{"page": ${groupPage}},{"$or":[{"userWord.difficulty":"hard"},{"userWord.difficulty":"weak"}]}]}&wordsPerPage=20`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const currUserWordsResponse = await request.json();
  const currUserWordsArr: IaggregatedWord[] = await currUserWordsResponse[0].paginatedResults;
  // console.log('response', response);
  console.log('CurrPageUserWords', currUserWordsArr);
  return currUserWordsArr;
  /*
    .catch(async (error) => {
      // console.log('catch(error');
      if (error.status === 402) {
        console.log('getUserWord. Error 402 Access token is missing or invalid');
      // error.message; // 'An error has occurred: 404'
      }
    });
    */
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

  const request:Response = await fetch(`${baseUrl}/words/${wordId}`, {
    method: 'GET',
  });
  const curWordResponse: Iword = await request.json();

  const playList = [
    `${baseUrl}/${curWordResponse.audio}`,
    `${baseUrl}/${curWordResponse.audioExample}`,
    `${baseUrl}/${curWordResponse.audioMeaning}`,
  ];
  console.log(`playList = ${playList}`);
  audioPlayer.src = `${baseUrl}/${curWordResponse.audio}`;

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

  const pageWords: Iword[] = await getWords();
  console.log('pageWords', pageWords);
  // console.log(pageWords[0].word);

  const userPageWords = await getCurrPageUserWords();
  console.log('userPageWords', userPageWords);

  const diffPageWords = await getAllHardUserWords();
  console.log('diffPageWords', diffPageWords);

  const currPageCommonArr: IaggregatedWord[] = pageWords.map((item) => {
    const aggrIndex = userPageWords.findIndex((aggitem) => (aggitem._id === item.id));
    console.log('aggrIndex', aggrIndex);
    return (aggrIndex !== -1) ? userPageWords[aggrIndex] : item;
  });

  console.log('commonArr', currPageCommonArr);

  const mainHtml = document.querySelector('.main') as HTMLElement;
  // textbookWrapper.innerHTML = '';
  mainHtml.innerHTML = `<section class="textbook">
    <div class="textbook-wrapper">
      <div class="textbook-headbtns_wrapper">
        <div class="textbook-pagination">
          <button class="textbook-prev_btn">Prev</button>
          <select name="textbook-select" id="textbook-select">            
          </select>
          <button class="textbook-nex_tbtn">Next</button>
          <button class="textbook-audio_btn">Audio challenge</button>
          <button class="textbook-sprint_btn">Sprint</button>
        </div>          
      </div>
     </div>     
    <div class="textbook-list_wrapper">
      <div class="textbook-list"></div>
    </div>
    <div class="textbook-group">
        <button class="textbook-group_btn" data-group="0">1</button>          
        <button class="textbook-group_btn" data-group="1">2</button>
        <button class="textbook-group_btn" data-group="2">3</button>
        <button class="textbook-group_btn" data-group="3">4</button>
        <button class="textbook-group_btn" data-group="4">5</button>
        <button class="textbook-group_btn" data-group="5">6</button>
        <button class="textbook-group_btn" data-group="6">7</button>
      </div>          
          
    <audio class="textbook-player"></audio>
  </section>
  `;

  // --------- Рендерю блок Select---------------------------

  const selectedPage = document.getElementById('textbook-select') as HTMLSelectElement;
  let pageOptionStr = '';
  const groupPage = Number(localStorage.getItem('groupPage'));
  for (let i = 0; i < 30; i += 1) {
    if (groupPage === i) pageOptionStr += `<option value="${i}" selected>Page ${i + 1}</option>`;
    else pageOptionStr += `<option value="${i}">Page ${i + 1}</option>`;
  }
  selectedPage.innerHTML = `${pageOptionStr}`;

  // ======== Рендерю карточки со словами  ==================

  const textbookPage = document.querySelector('.textbook-list') as HTMLElement;

  // --------- Если выбран обычный раздел -------------------

  if (Number(localStorage.getItem('group')) !== 6) {
    currPageCommonArr.forEach((elem: IaggregatedWord, index: number) => {
      let id: string;
      let wordTrueAnsw: number;
      let wordFalseAnsw: number;
      let wordDifficulty: string;
      let wordDifficultyFlag: string;
      let wordLearnedFlag: string;
      if (elem.id) { id = elem.id; } else id = String(elem._id);
      if (elem?.userWord?.optional.trueAnsw) { wordTrueAnsw = elem?.userWord?.optional.trueAnsw; } else wordTrueAnsw = 0;
      if (elem?.userWord?.optional.falseAnsw) { wordFalseAnsw = elem?.userWord?.optional.falseAnsw; } else wordFalseAnsw = 0;
      if (elem?.userWord?.difficulty) {
        wordDifficulty = elem?.userWord?.difficulty;
      } else wordDifficulty = '';
      if (wordDifficulty === 'hard') wordDifficultyFlag = '_difficult'; else wordDifficultyFlag = '';
      if (wordDifficulty === 'weak') wordLearnedFlag = '_learned'; wordLearnedFlag = '';

      const wordCard = document.createElement('div');
      wordCard.classList.add('textbook-item');
      // console.log(elem);
      // wordCard.style.backgroundImage = `url('http://localhost:2020/${elem.image}')`;
      wordCard.innerHTML = `<div class="textbook-item_picture">
        <img class="textbook-item_img" src=${baseUrl}/${elem.image}>
      </div>
      <div class="textbook-item_article">
      <span class="textbook-word">${elem.word}</span>
      <span class="textbook-word_transcription">${elem.transcription}</span>
      <span class="textbook-word_translate">${elem.wordTranslate}</span>
      <button class="textbook-play" data-audioplay='${id}'></button>
      </div>
      <div class="textbook-item_article">
      <span class="textbook-example">${elem.textExample} - </span>    
      <span class="textbook-example_translate">${elem.textExampleTranslate}</span>
      </div>
      <div class="textbook-item_article">
      <span class="textbook-meaning">${elem.textMeaning} - </span>
      <span class="textbook-meaning_translate">${elem.textMeaningTranslate}</span>
      </div>
      <div class="textbook-wordbtns_wrapper">
        <button class="word-btn learned-word ${wordLearnedFlag}" data-learned='${id}'>Learn</button>
        <button class="word-btn difficult-word ${wordDifficultyFlag}" data-difficult='${id}'>Difficult</button>      
      </div>
      <div class="textbook-answ_wrapper">
        <span class="answ-true">${wordTrueAnsw}</span>
        <span class="answ-separator">/</span>
        <span class="answ-false">${wordFalseAnsw}</span>
      </div>
      <div class="textbook-word_blur"></div>
      `;

      textbookPage.append(wordCard);
    });
  }

  // --------- Если выбран раздел СЛОЖНЫЕ СЛОВА-------------------

  if (Number(localStorage.getItem('group')) === 6) {
    diffPageWords.forEach((elem: IaggregatedWord, index: number) => {
      const wordCard = document.createElement('div');
      wordCard.classList.add('textbook-item');
      wordCard.dataset.item_id = `${elem._id}`;
      // console.log(elem);
      // wordCard.style.backgroundImage = `url('http://localhost:2020/${elem.image}')`;
      wordCard.innerHTML = `<div class="textbook-item_picture">
        <img class="textbook-item_img" src=${baseUrl}/${elem.image}>
      </div>
      <div class="textbook-item_article">
      <span class="textbook-word">${elem.word}</span>
      <span class="textbook-word_transcription">${elem.transcription}</span>
      <span class="textbook-word_translate">${elem.wordTranslate}</span>
      <button class="textbook-play" data-audioplay='${elem._id}'></button>
      </div>
      <div class="textbook-item_article">
      <span class="textbook-example">${elem.textExample} - </span>    
      <span class="textbook-example_translate">${elem.textExampleTranslate}</span>
      </div>
      <div class="textbook-item_article">
      <span class="textbook-meaning">${elem.textMeaning} - </span>
      <span class="textbook-meaning_translate">${elem.textMeaningTranslate}</span>
      </div>
      <div class="textbook-wordbtns_wrapper">
        <button class="word-btn learned-word" data-learned='${elem._id}' disabled>Learn</button>
        <button class="word-btn difficult-word" data-difficult='${elem._id}'>Remove</button>      
      </div>
      <div class="textbook-answ_wrapper">
        <span class="answ-true">0</span>
        <span class="answ-separator">/</span>
        <span class="answ-false">0</span>
      </div>
      <div class="textbook-word_blur"></div>
      `;

      textbookPage.append(wordCard);
    });
  }

  // ----- Функция переключения СТРАНИЦ

  const wichPage = async (step: number) => {
    const oldPage = Number(localStorage.getItem('groupPage'));
    const oldGroup = Number(localStorage.getItem('group'));

    let newPage = oldPage + step;
    const newGroup = oldGroup;
    if (newPage < 0) newPage = 0;
    if (newPage > 29) newPage = 29;
    localStorage.setItem('group', String(newGroup));
    localStorage.setItem('groupPage', String(newPage));
    getCurrPageUserWords().then(() => { renderTextbookPage(); });
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

  // ----- Функция переключения РАЗДЕЛОВ

  const gropButtons = document.querySelectorAll(
    '.textbook-group_btn[data-group]',
  ) as NodeListOf<HTMLButtonElement>;
  gropButtons.forEach(async (button, i: number) => {
    const groupBtnNum = localStorage.getItem('group');
    if ((button as HTMLButtonElement).dataset.group === groupBtnNum) button.classList.add('_selected');
    else button.classList.remove('_selected');
  });

  gropButtons.forEach(async (button, i: number) => {
    // button.classList.remove('_selected');
    const groupBtnNum = localStorage.getItem('group');
    button.addEventListener('click', () => {
      // button.classList.remove('_selected');
      // button.classList.add('_selected');
      if ((button as HTMLButtonElement).dataset.group === groupBtnNum) button.classList.add('_selected');

      const currGroupNum = Number((button as HTMLButtonElement).dataset.group);
      localStorage.setItem('group', String(currGroupNum));
      console.log('Выбрана группа учебника', currGroupNum);
      localStorage.setItem('groupPage', '0');
      // renderGroupBtns();
      if (currGroupNum === 6) {
        getAllHardUserWords().then(() => renderTextbookPage());
      } else {
        getCurrPageUserWords().then(() => { renderTextbookPage(); });
      }
    });
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
    '.difficult-word[data-difficult]',
  ) as NodeListOf<HTMLButtonElement>;
  const trueAnswCount = Number((document.querySelector('.answ-true') as HTMLElement).textContent);
  const falseAnswCount = Number((document.querySelector('.answ-true') as HTMLElement).textContent);

  // console.log('learnBtns', learnBtns);
  // console.log('difficultBtns', difficultBtns);

  const group = Number(localStorage.getItem('group'));
  const getUserFromLS = await String(localStorage.getItem('userData'));
  const getauthentData: IauthorisedUser = JSON.parse(getUserFromLS);
  const { userId } = getauthentData;
  const userToken: string = getauthentData.token;

  const createUserWord = async (wordId: string, word: IUserWordOptions) => {
    const rawResponse = await fetch(`${baseUrl}/users/${userId}/words/${wordId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getauthentData.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    })
      .then(async (response) => {
        const content: IUserWord = await response.json();
        console.log(content);
      })
      .catch(async (error) => {
        alert('Вам необходимо пройти авторизацию');
        // error.message; // 'An error has occurred: 404'
      });
  };

  const updateUserWord = async (wordId: string, word: IUserWordOptions) => {
    const rawResponse = await fetch(`${baseUrl}/users/${userId}/words/${wordId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getauthentData.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    });
    const updataContent: IUserWord = await rawResponse.json();
    console.log('updataContent = ', updataContent);
  };

  const deleteUserWord = async (wordId: string) => {
    const rdeleteResponse = await fetch(`${baseUrl}/users/${userId}/words/${wordId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getauthentData.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        console.log('deleteUserWord response.status', response.status);
      })
      .catch(async (error) => {
      // console.log('catch(error');
        if (error.status === 401) {
          console.log('getUserWord. Error 401 Access token is missing or invalid');
          // error.message; // 'An error has occurred: 404'
        }
      });
  };

  const getUserWord = async (wordId: string, token: string, word: IUserWordOptions) => {
    const request = await fetch(`${baseUrl}/users/${userId}/words/${wordId}`, {
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
      })
      .catch(async (error) => {
        // console.log('catch(error');
        if (error.status === 404) {
          console.log('getUserWord. Error 404');
        // error.message; // 'An error has occurred: 404'
        }
      });
  };

  learnBtns.forEach(async (learnButton) => {
    learnButton.addEventListener('click', async () => {
      console.log('Нажал Learned');
      const currLearnedId = String((learnButton as HTMLButtonElement).dataset.learned);
      const curdiffButton = document.querySelector(`.difficult-word[data-difficult='${currLearnedId}']`) as HTMLButtonElement;
      learnButton.classList.add('_learned');

      const diffBtnStatus = 'weak';
      curdiffButton.classList.remove('_difficult');

      // ------Запускаем проверку на наличие такого слова в userWords

      const isUserWord = await getUserWord(
        currLearnedId,
        userToken,
        {
          difficulty: diffBtnStatus,
          optional: {
            group: String(group), groupPage: String(groupPage), trueAnsw: trueAnswCount, falseAnsw: falseAnswCount,
          },
        },
      ).catch((error) => {
        // error.message; // 'An error has occurred: 404'
      });
    });
  });

  difficultBtns.forEach(async (diffButton, i: number) => {
    diffButton.addEventListener('click', async () => {
      console.log('Нажал Dificult');
      const currDifficultId = String((diffButton as HTMLButtonElement).dataset.difficult);
      const currLearnedBtn = document.querySelector(`.learned-word[data-learned='${currDifficultId}']`) as HTMLButtonElement;
      diffButton.classList.add('_difficult');

      if (Number(localStorage.getItem('group')) !== 6) {
        const diffBtnStatus = 'hard';
        currLearnedBtn.classList.remove('_learned');

        // ------Запускаем проверку на наличие такого слова в userWords

        const isUserWord = await getUserWord(
          currDifficultId,
          userToken,
          {
            difficulty: diffBtnStatus,
            optional: {
              group: String(group), groupPage: String(groupPage), trueAnsw: trueAnswCount, falseAnsw: falseAnswCount,
            },
          },
        ).catch((error) => {
          // error.message; // 'An error has occurred: 404'
        });
      }

      if (Number(localStorage.getItem('group')) === 6) {
        const textBookItem = document.querySelector(`.textbook-item[data-item_id='${currDifficultId}']`) as HTMLElement;
        textBookItem.classList.add('_removed-item');
        deleteUserWord(currDifficultId);
      }
    });
  });

  const audioGame = document.querySelector('.textbook-audio_btn') as HTMLButtonElement;
  const sprintGame = document.querySelector('.textbook-sprint_btn') as HTMLButtonElement;
};
