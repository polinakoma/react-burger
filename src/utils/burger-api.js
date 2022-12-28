import { BURGER_API_URL } from './constans.js';
import { request } from './constans.js';


const sendIngredients = (ingredients, func) => {
	request(`${BURGER_API_URL}/orders`, {
		method: 'POST',
		headers: {
				"Content-type": 'application/json'
			},
		body: JSON.stringify(ingredients)
	})
	.then(data => {
			func(data);
	})
	.catch((err) => {
		console.log(`Ошибка ${err}`)
	})
};

export { sendIngredients };