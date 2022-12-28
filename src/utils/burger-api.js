import { BURGER_API_URL } from './constans.js';
import { REQUEST } from './constans.js';


const sendIngredients = (ingredients, func) => {
	REQUEST(`${BURGER_API_URL}/orders`, {
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