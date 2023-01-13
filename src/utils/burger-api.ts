import { request, BURGER_API_URL } from '../services/constants/constants';


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