import { Iwords } from './data';

export const getWords = async () => {
  let group = 0;
  let groupPage = 0;
  if (localStorage.getItem('group')) group = Number(localStorage.getItem('group'));
  if (localStorage.getItem('groupPage')) groupPage = Number(localStorage.getItem('groupPage'));

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
      console.log(`следующий трек = ${audioPlayer.src}`);
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
        <source src="" id="src1" type="audio/mpeg">
        <source src="" id="src2" type="audio/mpeg">
        <source src="" id="src3" type="audio/mpeg">
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
    wordCard.style.backgroundImage = `url('http://localhost:2020/${elem.image}')`;
    wordCard.innerHTML = `<span class="textbook-word">${elem.word}</span>
    <span class="textbook-word_transcription">${elem.transcription}</span>
    <span class="textbook-word_translate">${elem.wordTranslate}</span>
    <button class="textbook-play" data-audioplay='${elem.id}'></button>
    <p class="textbook-word_audio">${elem.audioExample}</p>
    <span class="textbook-example">${elem.textExample} - </span>    
    <span class="textbook-example_translate">${elem.textExampleTranslate}</span>
    <p class="textbook-example_audio">${elem.audioExample}</p>
    <span class="textbook-meaning">${elem.textMeaning} - </span>
    <span class="textbook-meaning_translate">${elem.textMeaningTranslate}</span>
    <p class="textbook-meaning_audio">${elem.audioMeaning}</p>
    <div class="textbook-btns_wrapper">
      <button class="word-btn learned-word">Learn</button>
      <button class="word-btn difficult-word">Difficult</button>
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

  const audioGame = document.querySelector('.textbook-audio_btn') as HTMLButtonElement;
  const sprintGame = document.querySelector('.textbook-sprint_btn') as HTMLButtonElement;
};
