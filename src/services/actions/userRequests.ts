import { request, BURGER_API_URL } from '../constants/constants';
import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';
import { getUserApi } from '../../utils/user-api';
import { AppDispatch, AppThunk } from '../types';
import { IInputData } from '../types/data';


export const LOGIN: 'LOGIN' = 'LOGIN';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';

export const LOGOUT: 'LOGOUT' = 'LOGOUT';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';

export const REGISTRATION: 'REGISTRATION' = 'REGISTRATION';
export const REGISTRATION_SUCCESS: 'REGISTRATION_SUCCESS' = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILED: 'REGISTRATION_FAILED' = 'REGISTRATION_FAILED';

export const FORGOT_PASSWORD: 'FORGOT_PASSWORD' = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD: 'RESET_PASSWORD' = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';

export const GET_USER: 'GET_USER' = 'GET_USER';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';

export const AUTH_CHECKED: 'AUTH_CHECKED' = 'AUTH_CHECKED';

export const UPDATE_USER_DATA: 'UPDATE_USER_DATA' = 'UPDATE_USER_DATA';
export const UPDATE_USER_DATA_SUCCESS: 'UPDATE_USER_DATA_SUCCESS' = 
'UPDATE_USER_DATA_SUCCESS';
export const UPDATE_USER_DATA_FAILED: 'UPDATE_USER_DATA_FAILED' = 
'UPDATE_USER_DATA_FAILED';


export const getUser: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({
        type: GET_USER
    });
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


export const checkAuth: AppThunk = () => (dispatch: AppDispatch) => {
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
        });
    }
};

export const registerUserRequest: AppThunk = (form: IInputData) => (dispatch: AppDispatch) => {
    dispatch({
        type: REGISTRATION
    });
    request(`${BURGER_API_URL}/auth/register`, {
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
                payload: res.user
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
};

export const logInRequest: AppThunk = (form: IInputData) => (dispatch: AppDispatch) => {
    dispatch({
        type: LOGIN
    });
    request(`${BURGER_API_URL}/auth/login`, {
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
                payload: res.user
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
};

export const logOutRequest: AppThunk = (refreshToken: string) => (dispatch: AppDispatch) => {
    dispatch({
        type: LOGOUT
    });
    request(`${BURGER_API_URL}/auth/logout`, {
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
};

// forgot-password
export const resetPasswordRequest: AppThunk = (form: IInputData, redirect: () => void) => 
(dispatch: AppDispatch) => {
    dispatch({
        type: FORGOT_PASSWORD
    });
    request(`${BURGER_API_URL}/password-reset`, {
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
};

// reset-password
export const settingNewPasswordRequest: AppThunk = (form: IInputData, redirect: () => void) => 
(dispatch: AppDispatch) => {
    dispatch({
        type: RESET_PASSWORD
    });
    request(`${BURGER_API_URL}/password-reset/reset`, {
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
};

export const saveUserData: AppThunk = (name: string, email: string, password: string) => 
(dispatch: AppDispatch) => {
    dispatch({
        type: UPDATE_USER_DATA
    });
    request(`${BURGER_API_URL}/auth/user`, {
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
                        console.log(res)
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
};