export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';
export const WEB_SOCKET_URL = 'wss://norma.nomoreparties.space/orders';

export const PENDING_IMAGE = 'https://stellarburgers.nomoreparties.site/static/media/loading.89540200.svg';

export const CHECK_RESPONSE = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const REQUEST = (url, options) => {
    return fetch(url, options).then(CHECK_RESPONSE)
};

export const GET_ORDER_TIME = (string) => {
    return new Date(string).toLocaleString();
};

export const GET_ORDER_STATUS = (status) => {
    if(status === 'done') {
        return 'Выполнен'
    } else if(status === 'canseled') {
        return 'Отменен'
    } else if(status === 'pending') {
        return 'Готовится'
    } else if(status === 'created') {
        return 'Создан'
    }
};