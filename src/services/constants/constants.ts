export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';
export const WEB_SOCKET_URL = 'wss://norma.nomoreparties.space/orders';

export const PENDING_IMAGE = 'https://stellarburgers.nomoreparties.site/static/media/loading.89540200.svg';

export const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err: string) => Promise.reject(err));
};

export const request = (url: string, options?: any) => {
    return fetch(url, options).then(checkResponse)
};

export const getOrderTime = (string: string) => {
    return new Date(string).toLocaleString();
};

export const getOrderStatus = (status: string) => {
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