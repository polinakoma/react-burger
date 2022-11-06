import { BURGER_API_URL } from './constans.js';


const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
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
    //.catch 
};


export { sendIngredients };