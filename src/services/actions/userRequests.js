import { REQUEST } from '../../utils/constans.js';
import { BURGER_API_URL } from '../../utils/constans.js';
import { getCookie, setCookie, deleteCookie } from '../../utils/cookie.js';
import { getUserApi } from '../../utils/user-api.js';


export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const REGISTRATION = 'REGISTRATION';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const GET_USER = 'GET_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const AUTH_CHECKED = 'AUTH_CHECKED';

export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const UPDATE_USER_DATA_SUCCESS = 'UPDATE_USER_DATA_SUCCESS';
export const UPDATE_USER_DATA_FAILED = 'UPDATE_USER_DATA_FAILED';


export const getUser = () => (dispatch) => {

    dispatch({
        type: GET_USER
    })
    return getUserApi()
    .then(res => {
        if(res.success) {
            dispatch({
                type: GET_USER_SUCCESS,
                payload: res.user
            })
        }
    })
    .catch((err) => {
        dispatch({
            type: GET_USER_FAILED
        })
        err.message && console.log(`Ошибка запроса ${err.message}`)
        !err.message && console.log(err)
    })
};

export const checkAuth = () => (dispatch) => {
    if(getCookie('accessToken')) {
        dispatch(getUser())
            .finally(() => {
                dispatch ({
                    type: AUTH_CHECKED
                })
            })
    } else {
        dispatch ({
            type: AUTH_CHECKED
        })
    }
};

export const registerUserRequest = (form) => {
    return (dispatch) => {
        dispatch({
            type: REGISTRATION
        })
        REQUEST(`${BURGER_API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify(form)
        })
        .then(res => {
            if(res.success) {
                dispatch({
                    type: REGISTRATION_SUCCESS,
                    payload: res
                });

                localStorage.setItem('refreshToken', res.refreshToken)
            }
        })
        .catch((err) => {
            console.log(`Ошибка запроса ${err}`)
            dispatch({
                type: REGISTRATION_FAILED
            });
        });
    }
};

export const logInRequest = (form) => {
    return function(dispatch) {
        dispatch({
            type: LOGIN
        });
        REQUEST(`${BURGER_API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    "Content-type": 'application/json'
                },
                body: JSON.stringify(form)
            })
        .then(res => {
            if(res.success) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res
                });

                setCookie('accessToken', res.accessToken)
                localStorage.setItem('refreshToken', res.refreshToken)
            }
        })
        .catch((err) => {
            console.log(`Ошибка запроса ${err}`);
            dispatch({
                type: LOGIN_FAILED
            });
        })
    }
};

export const logOutRequest = (refreshToken) => {
    return function(dispatch){
        dispatch({
            type: LOGOUT
        })
        REQUEST(`${BURGER_API_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify({
                "token": refreshToken
            })
        })
        .then(res => {
            if(res.success) {
                dispatch({
                    type: LOGOUT_SUCCESS,
                })

                localStorage.removeItem('refreshToken')
                deleteCookie('accessToken')
            }
        })
        .catch((err) => {
            dispatch({
                type: LOGOUT_FAILED
            }) 
            console.log(`Ошибка запроса ${err}`)
        })
    }
};

// forgot-password
export const resetPasswordRequest = (form, redirect) => {
    return function(dispatch) {
        dispatch({
            type: FORGOT_PASSWORD
        });
        REQUEST(`${BURGER_API_URL}/password-reset`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                "Content-type": 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(form)
        })
        .then(res => {
            if(res.success) { 
                console.log(res) 
                dispatch({
                    type: FORGOT_PASSWORD_SUCCESS,
                    payload: res.success
                });
                redirect();
            }
        })
        .catch((err) => {
            dispatch({
                type: FORGOT_PASSWORD_FAILED,
            });
            console.log(`Ошибка запроса ${err}`)
        })
    }
};

// reset-password
export const settingNewPasswordRequest = (form, redirect) => {
    return function(dispatch) {
        dispatch({
            type: RESET_PASSWORD
        })
        REQUEST(`${BURGER_API_URL}/password-reset/reset`, {
            method: 'POST',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify(form)
        })
        .then(res => {
            if(res.success) {
                dispatch({
                    type: RESET_PASSWORD_SUCCESS
                }) 
                redirect();
            }
        })
        .catch((err) => {
            dispatch({
                type: RESET_PASSWORD_FAILED
            }) 
            console.log(`Ошибка запроса ${err}`)
        })
    }
};

export const saveUserData = (name, email,password) => {
    return function(dispatch) {
        dispatch({
            type: UPDATE_USER_DATA
        })
        REQUEST(`${BURGER_API_URL}/auth/user`, {
            method: 'PATCH',
            headers: {
                "Content-type": 'application/json',
                "Authorization": getCookie('accessToken')
            },
            body: JSON.stringify({
                'name': name,
                'email': email,
                'password': password
            })
        })
        .then(res => {
            if(res.success) {
                dispatch({
                    type: UPDATE_USER_DATA_SUCCESS,
                    payload: res.user
                })
            }
        })
        .catch((err) => {
            dispatch({
                type: UPDATE_USER_DATA_FAILED
            })
            console.log(`Ошибка запроса ${err}`)
        })
    }
};