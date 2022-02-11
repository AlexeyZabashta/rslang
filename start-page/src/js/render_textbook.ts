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
  // renderTextbookPage(resp);
  return wordsResponse;
};

export const renderTextbookPage = async () => {
  console.log('Отрисовываю страницу TextbookPage');

  const pageWords: Iwords[] = await getWords();
  console.log(pageWords);
  console.log(pageWords[0].word);

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
    </section> 
    `;

  const selectedPage = document.getElementById('textbook-select') as HTMLSelectElement;
  let pageOptionStr = '';
  for (let i = 0; i < 30; i += 1) {
    pageOptionStr += `<option value="${i}">Page ${i + 1}</option>`;
  }
  selectedPage.innerHTML = `${pageOptionStr}`;

  const textbookPage = document.querySelector('.textbook-list') as HTMLElement;

  pageWords.forEach((elem: Iwords, index: number) => {
    const wordCard = document.createElement('div');
    wordCard.classList.add('textbook-item');
    wordCard.style.backgroundImage = `url('http://localhost:2020/${elem.image}')`;
    wordCard.innerHTML = `<span class="textbook-word">${elem.word}</span>
    <span class="textbook-word_transcription">${elem.transcription}</span>
    <span class="textbook-word_translate">${elem.wordTranslate}</span>
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

  const prevBtn = document.querySelector('.textbook-prev_btn') as HTMLButtonElement;

  const nextBtn = document.querySelector('.textbook-nex_tbtn') as HTMLButtonElement;
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

  prevBtn.addEventListener('click', () => {
    // updateRenderRace();
    wichPage(-1);
  });

  nextBtn.addEventListener('click', () => {
    // updateRenderRace();
    wichPage(1);
  });

  const audioGame = document.querySelector('.textbook-audio_btn') as HTMLButtonElement;
  const sprintGame = document.querySelector('.textbook-sprint_btn') as HTMLButtonElement;
};
