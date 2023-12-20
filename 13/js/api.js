const SERVER_URL = 'https://29.javascript.pages.academy/kekstagram';
const GET_DATA_PATH = '/data';
const SEND_DATA_PATH = '/';

const loadData = (errorText, route, method = 'GET', body = null) =>
  fetch(`${SERVER_URL}${route}`, {method, body})
    .then((response) => {
      if (response.ok){
        return response.json();
      }
      throw new Error();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => loadData('Не удалось загрузить', GET_DATA_PATH);

const sendData = (body) => loadData('Не удалось отправить форму', SEND_DATA_PATH, 'POST', body);

export {getData, sendData};
