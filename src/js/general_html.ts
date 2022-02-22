import { homePage } from './render_home_page';
import { aboutAppPage } from './render_about_app';
import { renderTextbookPage } from './render_textbook';
import { renderGamesPage } from './render_games_page';
import { renderStatisticsPage } from './render_statistics';

export const renderHTMLStructure = async () => {
  const bodyHtml = document.querySelector('.body') as HTMLElement;
  bodyHtml.innerHTML = '';
  const header = document.createElement('header');
  header.classList.add('header');
  const main = document.createElement('main');
  main.classList.add('main');
  const footer = document.createElement('footer');
  footer.classList.add('footer');
  bodyHtml.append(header);
  bodyHtml.append(main);
  bodyHtml.append(footer);
};

renderHTMLStructure().then(async () => {
  const headerHtml = document.querySelector('.header') as HTMLElement;
  headerHtml.innerHTML = '';
  headerHtml.innerHTML = `<h1 class="header-current"></h1>
    <div class="burger"></div>
    <nav class="header-nav">
      <button class="nav-btn nav-home">Home</button>
      <button class="nav-btn nav-textbook">TextBook</button>
      <button class="nav-btn nav-games">Games</button>
      <button class="nav-btn nav-statistics">Statistics</button>
      <button class="nav-btn nav-developers">About App</button>   
    </nav>     
  `;
})

  .then(async () => {
    const burgerMenu = document.querySelector('.burger') as HTMLElement;
    const menuSettings = document.querySelector('.header-nav') as HTMLElement;
    burgerMenu.addEventListener('click', () => {
      burgerMenu.classList.toggle('_active');
      menuSettings.classList.toggle('_active');
    });
  })

  .then(async () => {
    const homeHtml = document.querySelector('.nav-home') as HTMLButtonElement;
    homeHtml.addEventListener('click', () => {
      // console.log(' вызываю homePage();');
      localStorage.setItem('currentPage', 'Home');
      const headerTitle = document.querySelector('.header-current') as HTMLElement;
      headerTitle.innerHTML = 'Home';
      homePage();
    });
  })

  .then(async () => {
    const textbookHtml = document.querySelector('.nav-textbook') as HTMLButtonElement;
    textbookHtml.addEventListener('click', () => {
      // console.log(' вызываю textbookPage');
      const mainHtml = document.querySelector('.main') as HTMLElement;
      mainHtml.innerHTML = `
    `;
      localStorage.setItem('currentPage', 'Textbook');
      const headerTitle = document.querySelector('.header-current') as HTMLElement;
      headerTitle.innerHTML = 'Textbook';
      // renderGroupBtns();
      renderTextbookPage();
    });
  })

  .then(async () => {
    const gamesHtml = document.querySelector('.nav-games') as HTMLButtonElement;
    gamesHtml.addEventListener('click', () => {
      // console.log(' вызываю textbookPage');
      const mainHtml = document.querySelector('.main') as HTMLElement;
      mainHtml.innerHTML = `
    `;
      localStorage.setItem('currentPage', 'Games');
      const headerTitle = document.querySelector('.header-current') as HTMLElement;
      headerTitle.innerHTML = 'Games';
      // renderGroupBtns();
      renderGamesPage();
    });
  })

  .then(async () => {
    const statisticsHtml = document.querySelector('.nav-statistics') as HTMLButtonElement;
    statisticsHtml.addEventListener('click', () => {
      // console.log(' вызываю Statistics page();');
      localStorage.setItem('currentPage', 'Statistics');
      const headerTitle = document.querySelector('.header-current') as HTMLElement;
      headerTitle.innerHTML = 'Statistics';
      renderStatisticsPage();
    });
  })

  .then(async () => {
    const developersHtml = document.querySelector('.nav-developers') as HTMLButtonElement;
    developersHtml.addEventListener('click', () => {
      // console.log(' вызываю About App page();');
      localStorage.setItem('currentPage', 'About App');
      const headerTitle = document.querySelector('.header-current') as HTMLElement;
      headerTitle.innerHTML = 'About App';
      aboutAppPage();
    });
  })
  /*

  .then(async () => {
    const loginHtml = document.querySelector('.header-login_btn') as HTMLButtonElement;
    loginHtml.addEventListener('click', () => {
      // console.log(' Хочу залогинится;');
      // localStorage.setItem('currentPage', 'About App');
      renderLoginWindow();
    });
  })
  */

  .then(async () => {
    const footerHtml = document.querySelector('.footer') as HTMLElement;
    footerHtml.innerHTML = '';
    footerHtml.innerHTML = `<div class="footer-rsschool">
    <a href="https://rs.school/js/" target="_Blank"
      ><div class="footer-rsschool_svg"></div
    ></a>
  </div>      
  <div class="footer-github">
    <a href="https://github.com/ArturZabashta" target="_Blank">
      Artur
      <div class="my-github"></div>
    </a>
    <div class="footer-github_logo"></div>
    <a href="https://github.com/AlexeyZabashta" target="_Blank">
      Alexey
      <div class="my-github"></div>
    </a>
  </div>
  <div class="footer-copyright">© 2022</div>   
  `;
  });

window.addEventListener('load', async () => {
  if (!localStorage.getItem('currentPage')) { homePage(); } else {
    if (localStorage.getItem('currentPage') === 'Home') homePage();
    if (localStorage.getItem('currentPage') === 'Textbook') {
      renderTextbookPage();
    }
    if (localStorage.getItem('currentPage') === 'Games') renderGamesPage();
    if (localStorage.getItem('currentPage') === 'About App') aboutAppPage();
    if (localStorage.getItem('currentPage') === 'Statistics') renderStatisticsPage();
    if (localStorage.getItem('currentPage') === 'About App') aboutAppPage();
    // if (localStorage.getItem('currentPage') === "Home") homePage();
  }

  const headerTitle = document.querySelector('.header-current') as HTMLElement;
  headerTitle.innerHTML = 'Statistics';
  if (!localStorage.getItem('currentPage')) { headerTitle.innerHTML = ''; } else {
    if (localStorage.getItem('currentPage') === 'Home') {
      headerTitle.innerHTML = '';
    }
    if (localStorage.getItem('currentPage') === 'Textbook') {
      headerTitle.innerHTML = 'Textbook';
    }
    if (localStorage.getItem('currentPage') === 'Games') {
      headerTitle.innerHTML = 'Games';
    }
    if (localStorage.getItem('currentPage') === 'Statistics') {
      headerTitle.innerHTML = 'Statistics';
    }
    if (localStorage.getItem('currentPage') === 'About App') {
      headerTitle.innerHTML = 'About App';
    }
  }
});
