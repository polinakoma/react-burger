import { BURGER_API_URL } from './constans.js';


const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };


const getIngredients = (func) => {
    fetch(`${BURGER_API_URL}/ingredients`)
    .then((res) => checkReponse(res))
    .then(json => func(json.data))
    .catch(error => console.log(`Ошибка загрузки данных - ${error}`))
};

const sendIngredients = (ingredients, func) => {
    fetch(`${BURGER_API_URL}/orders`, {
        method: 'POST',
        headers: {
            "Content-type": 'application/json'
          },
        body: JSON.stringify(ingredients)
    })
    .then((res) => checkReponse(res))
    .then(data => {
        func(data);
    });
};


export { getIngredients, sendIngredients };