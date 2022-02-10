import './css/reset.css';
import './css/style.css';
import './js/data';
import './js/general_html';

const first = async () => {
  const request:Response = await fetch('http://localhost:2020/words?page=1&group=5', {
    method: 'GET',
  });
  const resp = await request.json();
  console.log(resp);
};

first();
