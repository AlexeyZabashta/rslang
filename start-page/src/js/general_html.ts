import { bodyHtml } from './data';
import { homePage } from './render_home_page';
import { aboutAppPage } from './render_about_app';
import { textbookPage } from './render_textbook';

export const renderHTMLStructure = async () => {
  bodyHtml.innerHTML = '';
  const header = document.createElement('header');
  header.classList.add('header');
  const mainWrapper = document.createElement('main-wrapper');
  mainWrapper.classList.add('main');
  const main = document.createElement('main');
  main.classList.add('main');
  const footer = document.createElement('footer');
  footer.classList.add('footer');
  mainWrapper.append(main);
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
    <button class="header-login _logged"></button>  
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
      console.log(' вызываю homePage();');
      homePage();
    });
  })

  .then(async () => {
    const textbookHtml = document.querySelector('.nav-textbook') as HTMLButtonElement;
    textbookHtml.addEventListener('click', () => {
      console.log(' вызываю textbookPage;');
      textbookPage();
    });
  })

  .then(async () => {
    const developersHtml = document.querySelector('.nav-developers') as HTMLButtonElement;
    developersHtml.addEventListener('click', () => {
      console.log(' вызываю About App page();');
      aboutAppPage();
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
