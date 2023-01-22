import { checkResponse, BURGER_API_URL } from '../services/constants/constants';
import { getCookie, setCookie } from "./cookie";


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
    .then(checkResponse)
    .then(refreshData => {
        if(!refreshData.success) {
            Promise.reject(refreshData)
        }

        localStorage.setItem('refreshToken', refreshData.refreshToken);
        setCookie('accessToken', refreshData.accessToken)

    })
};

const fetchWithRefresh = async (url: string, options?: any) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res); 
    } catch (error) {
        if (error.message === 'jwt expired') {
            const refreshData = await refreshToken();
            
            options.headers.Authorization = refreshData.accessToken;

            const res = await fetch(url, options);
            return await checkResponse(res); 
        } else {
            return Promise.reject(error);
        }
    }
};