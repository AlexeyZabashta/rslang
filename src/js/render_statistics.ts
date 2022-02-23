import { getUserStat, getAggrWordsUserGeneral, createStatField, putUserStat } from './requestSprint';

export const renderStatisticsPage = async () => {
  // console.log('Отрисовываю страницу Statistics');
  const mainHtml = document.querySelector('.main') as HTMLElement;
  mainHtml.innerHTML = '';
  mainHtml.innerHTML = `<section class="statistics_page">
  <section class="stat_words stat_section">
    <h2>Words Statistic</h2>
    <span id="new_words_all" class="span_stat">New words: ${await getAggrWordsUserGeneral(0)}</span>
    <span id="weak_words" class="span_stat">Learned words: ${await getAggrWordsUserGeneral(1)}</span>
    <span id="perc_date" class="span_stat">Answered correctly: ${await createStatField(0)}%</span>     
  </section>
  <section class="stat_sprint stat_section">
    <h2>Sprint Statistic</h2>
    <span id="new_words_sprint" class="span_stat">New words: ${await getAggrWordsUserGeneral(2)}</span>
    <span id="perc_date_sprint" class="span_stat">Answered correctly: ${await createStatField(1)}%</span>
    <span id="best_series_sprint" class="span_stat">Best series: ${await createStatField(2)}</span>
  </section>
  <section class="stat_audio stat_section">
    <h2>Audio Statistic</h2>
    <span id="new_words_audio" class="span_stat">New words: ${await getAggrWordsUserGeneral(3)}</span>
    <span id="perc_date_audio" class="span_stat">Answered correctly: ${await createStatField(3)}%</span>
    <span id="best_series_audio" class="span_stat">Best series: ${await createStatField(4)}</span>    
  </section>      
</section> 
    `; 
  const getStat = document.querySelector('#getStat') as HTMLElement;
  getStat.addEventListener('click', getUserStat);
  const putStat = document.querySelector('#putStat') as HTMLElement;
  putStat.addEventListener('click', putUserStat);  
};
