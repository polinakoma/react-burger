import { checkReponse }from '../../utils/burger-api.js'
import { BURGER_API_URL } from '../../utils/constans.js';
import { getCookie } from '../../utils/cookie.js';
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

export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const UPDATE_USER_DATA_SUCCESS = 'UPDATE_USER_DATA_SUCCESS';
export const UPDATE_USER_DATA_FAILED = 'UPDATE_USER_DATA_FAILED';

export const AUTH_CHECKED = 'AUTH_CHECKED';


export const getUser = () => (dispatch) => {
        dispatch({
            type: GET_USER
        })
        return  getUserApi()
        .then((res) => checkReponse(res))
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
            console.log(`Ошибка запроса ${err}`)
        })
    }

export const checkAuth = () => (dispatch) => {
    if(getCookie('accessToken')) {
        dispatch(
            getUser()
            .finally(() => {
            dispatch ({
                type: AUTH_CHECKED
            })
        }))
    } else {
        dispatch ({
            type: AUTH_CHECKED
        })
    }
}

// register
export const registerUserRequest = (form) => {
        return (dispatch) => {
            dispatch({
                type: REGISTRATION
            })
            fetch(`${BURGER_API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    "Content-type": 'application/json'
                },
                body: JSON.stringify(form)
            })
            .then((res) => checkReponse(res))
            .then(res => {
                console.log(res)
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

// LOGIN
export const logInRequest = (form) => {
    return function(dispatch) {
        dispatch({
            type: LOGIN
        });

        fetch(`${BURGER_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify(form)
        })
        .then((res) => checkReponse(res))
        .then(res => {
            if(res.success) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res
                });

                localStorage.setItem('refreshToken', res.refreshToken)
            }
        })
        .catch((err) => {
            console.log(`Ошибка запроса ${err}`);
            dispatch({
                type: LOGIN_FAILED
            });
        })
    };
};

// forgot-password
export const ResetPasswordRequest = (form, redirect) => {
    return function(dispatch) {
        dispatch({
            type: FORGOT_PASSWORD
        });

        fetch(`${BURGER_API_URL}/password-reset`, {
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
        .then((res) => checkReponse(res))
        .then(res => {
            if(res.success) {  
                dispatch({
                    type: FORGOT_PASSWORD_SUCCESS,
                });

              //  redirect();
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
export const settingNewPasswordRequest = (form) => {
    return function(dispatch) {
        dispatch({
            type: RESET_PASSWORD
        })

        fetch(`${BURGER_API_URL}/password-reset/reset`, {
            method: 'POST',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify(form)
        })
        .then((res) => checkReponse(res))
        .then(res => {
            if(res.success) {
                dispatch({
                    type: RESET_PASSWORD_SUCCESS
                }) 
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

// Выход из системы 
export const logOutRequest = () => {
    return function(dispatch){
        dispatch({
            type: LOGOUT
        })

        fetch(`${BURGER_API_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify(localStorage.getItem('refreshToken'))
        })
        .then((res) => checkReponse(res))
        .then(res => {
            if(res.success) {
                dispatch({
                    type: LOGOUT_SUCCESS,
                    payload: null
                })
                localStorage.removeItem('refreshToken')
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


export const saveUserData = (accessToken) => {
    return function(dispatch) {
        dispatch({
            type: UPDATE_USER_DATA
        })

        fetch(`${BURGER_API_URL}/auth/user`, {
            method: 'PATCH',
            headers: {
                "Content-type": 'application/json',
                "Authorization": accessToken,
            },
            body: JSON.stringify(
                // серверу потребуется поля с отредактированной информацией
            )
        })
        .then((res) => checkReponse(res))
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


