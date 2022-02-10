export const textbookPage = (async () => {
  console.log('Отрисовываю страницу TextbookPage');
  const mainHtml = document.querySelector('.main') as HTMLElement;
  mainHtml.innerHTML = '';
  mainHtml.innerHTML = `<section class="textbook">
      <div class="textbook-wrapper">
        <div class="textbook-pagination">
          <button class="textbook-prev_btn">Prev</button>
          <select name="textbook-select" id="">
            <option value="1">Page 1</option>
            <option value="2">Page 2</option>
            <option value="3">Page 3</option>
            <option value="4">Page 4</option>
            <option value="5">Page 5</option>
            <option value="6">Page 6</option>
            <option value="7">Page 7</option>
            <option value="8">Page 8</option>
            <option value="9">Page 9</option>
            <option value="10">Page 10</option>
            <option value="11">Page 11</option>
          </select>
          <button class="textbook-nex_tbtn">Next</button>
          <button class="textbook-audio_btn">Audio challenge</button>
          <button class="textbook-sprint_btn">Sprint</button>
        </div>
        <div class="textbook-list">
          <div class="textbook-item">
            <p class="textbook-word"></p>
            <p class="textbook-transcript"></p>
            <p class="textbook-translate"></p>
            <p class="textbook-word_audio"></p>
            <p class="textbook-example"></p>
            <p class="textbook-example_translate"></p>
            <p class="textbook-meaning"></p>
            <p class="textbook-meaning_translate"></p>
            <p class="textbook-word_audio__meaning"></p>
          </div>
        </div>


      </div>

    </section>
    `;
});
