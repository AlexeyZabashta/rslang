import { aboutAppPage } from './render_about_app';
import { renderTextbookPage } from './render_textbook';
import { renderStatisticsPage } from './render_statistics';
import { renderGamesPage } from './render_games_page';
import { renderLoginWindow } from './render_login';

export const homePage = async () => {
  // console.log('Отрисовываю стартовую страницу');
  const mainHtml = document.querySelector('.main') as HTMLElement;
  mainHtml.innerHTML = '';
  mainHtml.innerHTML = `<section class="home">
  <button class="header-login_btn"></button>
    <div class="header-login_block"></div>
  <div class="home-wrapper">
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
        Meet the app developer team, which will introduce you to the app...
      </div>
    </div>
  </div>
  
  </section>
  `;

  const textbookHtml = document.querySelector('.home-textbook') as HTMLElement;
  textbookHtml.addEventListener('click', () => {
    // console.log(' вызываю textbookPage');
    localStorage.setItem('currentPage', 'Textbook');
    const headerTitle = document.querySelector('.header-current') as HTMLElement;
    headerTitle.innerHTML = 'TextBook';
    renderTextbookPage();
  });

  const gamesHtml = document.querySelector('.home-games') as HTMLElement;
  gamesHtml.addEventListener('click', () => {
    // console.log(' вызываю Games page();');
    localStorage.setItem('currentPage', 'Games');
    const headerTitle = document.querySelector('.header-current') as HTMLElement;
    headerTitle.innerHTML = 'Games';
    renderGamesPage();
  });

  const statisticsHtml = document.querySelector('.home-statistics') as HTMLElement;
  statisticsHtml.addEventListener('click', () => {
    // console.log(' вызываю Statistics page();');

    if (localStorage.getItem('userData') !== null) {
      statisticsHtml.style.opacity = '1';
      localStorage.setItem('currentPage', 'Statistics');
      const headerTitle = document.querySelector('.header-current') as HTMLElement;
      headerTitle.innerHTML = 'Statistics';
      renderStatisticsPage();
    } else {
      statisticsHtml.style.opacity = '0.8';
    }
  });

  const developersHtml = document.querySelector('.home-developers') as HTMLElement;
  developersHtml.addEventListener('click', () => {
    // console.log(' вызываю About App page();');
    localStorage.setItem('currentPage', 'About App');
    const headerTitle = document.querySelector('.header-current') as HTMLElement;
    headerTitle.innerHTML = 'About App';
    aboutAppPage();
  });

  const loginHtml = document.querySelector('.header-login_btn') as HTMLButtonElement;
  loginHtml.addEventListener('click', () => {
    // console.log(' Хочу залогинится;');
    // localStorage.setItem('currentPage', 'About App');
    renderLoginWindow();
  });

  if (localStorage.getItem('userData')) {
    loginHtml.classList.add('_logged');
  } else loginHtml.classList.remove('_logged');
};
