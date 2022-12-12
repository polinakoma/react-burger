import { checkReponse } from "./burger-api";
import { getCookie, setCookie } from "./cookie";
import { BURGER_API_URL } from '../utils/constans.js';


export const getUserApi = () => {
    return fetchWithRefresh(`${BURGER_API_URL}/auth/user`, {
        headers: {
            "Authorization": getCookie('accessToken'),
        },
    })
};

export const refreshToken = () => {

    return fetch(`${BURGER_API_URL}/auth/token`, {
        method: 'POST',
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')})
    })
    .then(checkReponse)
    .then(refreshData => {
        if(!refreshData.success) {
            Promise.reject(refreshData)
        }

        localStorage.setItem('refreshToken', refreshData.refreshToken);
        setCookie('accessToken', refreshData.accessToken)

    })
};


const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkReponse(res); 
    } catch (error) {
        if (error.message === 'jwt expired') {
            const refreshData = await refreshToken();
            
            options.headers.Authorization = refreshData.accessToken;

            const res = await fetch(url, options);
            return await checkReponse(res); 
        } else {
            return Promise.reject(error);
        }
    }
};