export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

export const pendingImage = 'https://stellarburgers.nomoreparties.site/static/media/loading.89540200.svg';


export const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const request = (url, options) => {
    return fetch(url, options).then(checkResponse)
};

export const wsUrlAllOrders = 'wss://norma.nomoreparties.space/api/orders/all';