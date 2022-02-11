export const homePage = (async () => {
  console.log('Отрисовываю стартовую страницу');
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
        Do you think learning English is boring? 
        How about learning by playing? 
        There are two games to choose from. 
        Audio Challenge - try to guess a word by ear.
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
  </section>
  `;
});
