export const aboutAppPage = (async () => {
  // console.log('Отрисовываю страницу Разработчики');
  const mainHtml = document.querySelector('.main') as HTMLElement;
  mainHtml.innerHTML = '';
  mainHtml.innerHTML = `<section class="developers">
      <h2 class="developers-title">Our team</h2>
      <div class="developers-wrapper">
        <div class="developer">
          <h3 class="developer-subtitle">Alexey Zabashta</h3>
          <p class="developer-role">Frontend developer</p>
          <p class="developer-work">Created and configured a copy of the back-end, 
            created a repository, wrote code for the Audiocall 
            and Sprint games, statistics page.
          </p>
        </div>
        <div class="developer">

          <h3 class="developer-subtitle">Artur Zabashta</h3>
          <p class="developer-role">Frontend developer</p>
          <p class="developer-work">Designed layout of the application, made main page, 
            login form, TextBook page and dictionary.
          </p>
        </div>
      </div>
    </section>
    `;
});
