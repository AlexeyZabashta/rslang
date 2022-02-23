import { bodyHtml } from './data';
import { homePage } from './render_home_page';
import { aboutAppPage } from './render_about_app';
import { renderTextbookPage } from './render_textbook';
import { renderGamesPage } from './render_games_page';
import { renderStatisticsPage } from './render_statistics';

export const renderHTMLStructure = async () => {
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
      <button class="nav-mode"></button>    
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
      if (localStorage.getItem('userData') !== null) {
        statisticsHtml.disabled = false;
        statisticsHtml.style.opacity = '1';
        localStorage.setItem('currentPage', 'Statistics');
        const headerTitle = document.querySelector('.header-current') as HTMLElement;
        headerTitle.innerHTML = 'Statistics';
        renderStatisticsPage();
      } else statisticsHtml.disabled = true;
      statisticsHtml.style.opacity = '0.7';
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

  .then(async () => {
    const nightMode = document.querySelector('.nav-mode') as HTMLButtonElement;
    nightMode.addEventListener('click', () => {
      if (localStorage.getItem('nightMode') === null) {
        localStorage.setItem('nightMode', 'nightMode');
        nightMode.classList.add('_night-mode');
        bodyHtml.classList.add('_night-mode');
      } else {
        localStorage.removeItem('nightMode');
        nightMode.classList.remove('_night-mode');
        bodyHtml.classList.remove('_night-mode');
      }
    });
  })

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

    if (localStorage.getItem('nightMode') === 'nightMode') {
      const nightMode = document.querySelector('.nav-mode') as HTMLButtonElement;
      nightMode.classList.add('_night-mode');
      bodyHtml.classList.add('_night-mode');
    }
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
