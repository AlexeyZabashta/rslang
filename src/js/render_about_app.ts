export const aboutAppPage = (async () => {
  // console.log('Отрисовываю страницу Разработчики');
  const mainHtml = document.querySelector('.main') as HTMLElement;
  mainHtml.innerHTML = '';
  mainHtml.innerHTML = `<section class="developers">
    <div class="developers-wrapper">
        <h2 class="developers-title">About App</h2>
        <div class="developer-aboutapp">
          <p class="developer-aboutapp_subtitle">
            <span>RS Lang</span> is an application for learning foreign words,
            including an electronic textbook with a database of words to learn, 
            mini-games to repeat them, a statistics page to track individual progress.
          </p>
          <p class="developer-aboutapp_subtitle">
            The application contains 3,600 frequently used English words
            that you need to organize your learning. 
            The words in the collection are sorted 
            from the simpler and more familiar to the more complex ones.  
            The entire collection is divided into six sections, 
            each section has 30 pages, each page has 20 words to study.
          </p>
          <p class="developer-aboutapp_subtitle">
          The seventh section of the textbook is specially designed for the user
           to be able to save Difficult words in it.
           <br> <br>
           <span>We wish you good luck in learning the language!!!</span>               
        </div>

        <h2 class="developers-title">Our team</h2>
        
        <div class="developer-wrapper">
          <div class="developer">
            <h3 class="developer-subtitle">Alexey Zabashta</h3>
            <p class="developer-role">Frontend developer</p>
            <p class="developer-work">Created and configured a copy of the back-end, 
              created a repository, wrote code for the AudioCall 
              and Sprint games, Statistics page.
            </p>
          </div>
          <div class="developer">
            <h3 class="developer-subtitle">Artur Zabashta</h3>
            <p class="developer-role">Frontend developer</p>
            <p class="developer-work">Developed application design, 
            was responsible for the development of the UI, 
            Home page, TextBook section, section with Difficult words, 
            user authorization logic.
            </p>
          </div>
        </div>
      </div>
    </section>
    `;
});
