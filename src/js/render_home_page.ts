import { aboutAppPage } from './render_about_app';
import { renderTextbookPage } from './render_textbook';
import { renderStatisticsPage } from './render_statistics';

export const homePage = async () => {
  //console.log('Отрисовываю стартовую страницу');
  const mainHtml = document.querySelector('.main') as HTMLElement;
  mainHtml.innerHTML = '';
  mainHtml.innerHTML = `<section class="home">
    <div class="home-intro home-article">
      <h2 class="home-intro_title">RS Lang</h2>
      <div class="home-intro_subtitle">
        RS Lang is an application designed to help you with mastering 
        the English language. Regular lessons with this application 
        will help you expand your language base. 
        To get access to the full functionality of the application, 
        we recommend that you go through a quick registration process. 
      </div>
    </div>

    <div class="home-textbook home-article">
      <h2 class="home-textbook_title">TextBook</h2>
      <div class="home-textbook_subtitle">
        With TextBook you can gradually learn words section by section, 
        practice correct pronunciation, get acquainted with examples of word usage 
        in different contexts.  
      </div>
    </div>

    <div class="home-games home-article">
      <h2 class="home-games_title">Games</h2>
      <div class="home-games_subtitle">
        Do you think learning English is boring?<br> 
        How about learning by playing? 
        There are two games to choose from.<br> 
        Audio Challenge - try to guess a word by ear.<br> 
        Sprint - become the fastest, guessing words visually. 
      </div>
    </div>

    <div class="home-statistics home-article">
      <h2 class="home-statistics_title">Statistics</h2>
      <div class="home-statistics_subtitle">
        Keep track of your learning progress 
        in the special section Statistics
      </div>
    </div>

    <div class="home-developers home-article">
      <h2 class="home-developers_title">About App</h2>
      <div class="home-developers_subtitle">
        Meet the app development team
      </div>
    </div>
  </section>
  `;

  const textbookHtml = document.querySelector('.home-textbook') as HTMLElement;
  textbookHtml.addEventListener('click', () => {
    //console.log(' вызываю textbookPage');
    localStorage.setItem('currentPage', 'Textbook');
    renderTextbookPage();
  });

  const gamesHtml = document.querySelector('.home-games') as HTMLElement;
  gamesHtml.addEventListener('click', () => {
    //console.log(' вызываю Games page();');
    localStorage.setItem('currentPage', 'Games');
    // renderStatisticsPage();
  });

  const statisticsHtml = document.querySelector('.home-statistics') as HTMLElement;
  statisticsHtml.addEventListener('click', () => {
    //console.log(' вызываю Statistics page();');
    localStorage.setItem('currentPage', 'Statistics');
    renderStatisticsPage();
  });

  const developersHtml = document.querySelector('.home-developers') as HTMLElement;
  developersHtml.addEventListener('click', () => {
    //console.log(' вызываю About App page();');
    localStorage.setItem('currentPage', 'About App');
    aboutAppPage();
  });
};
