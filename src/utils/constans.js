export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

export const pendingImage = 'https://stellarburgers.nomoreparties.site/static/media/loading.89540200.svg';

export const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const request = (url, options) => {
    return fetch(url, options).then(checkResponse)
};

export const creationTime = (string) => {
    return new Date(string).toLocaleString();
};

export const orderStatus = (status) => {
    if(status === 'done') {
        return 'Создан'
    } else if(status === 'canseled') {
        return 'Отменен'
    } else if(status === 'pending'){
        return 'Готовится'
    }
};