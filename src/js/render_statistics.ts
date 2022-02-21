export const renderStatisticsPage = async () => {
  // console.log('Отрисовываю страницу Statistics');
  const mainHtml = document.querySelector('.main') as HTMLElement;
  mainHtml.innerHTML = '';
  mainHtml.innerHTML = `<section class="statistics">
      <h2>Здесь будет отображена статистика изучения слов</h2>
    </section> 
    `;
};
