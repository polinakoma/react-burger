import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILED, 
REGISTRATION, REGISTRATION_SUCCESS, REGISTRATION_FAILED, FORGOT_PASSWORD, FORGOT_SUCCESS,
FORGOT_FAILED, RESET_PASSWORD, RESET_SUCCESS, RESET_FAILED, GET_USER, GET_USER_SUCCESS,
GET_USER_FAILED, UPDATE_USER_DATA, UPDATE_USER_DATA_SUCCESS, UPDATE_USER_DATA_FAILED, AUTH_CHECKED } 
from '../actions/user_requests.js'


const initialState = {
    isAuthChecked: false,
    userInfo: null,

    registrationRequest: false,
    registrationRequestFailed: false,

    loginRequest: false,
    loginRequestFailed: false,

    getUserRequest: false,
    getUserRequestFailed: false,
    
    logoutRequest: false,
    logoutRequestFailed: false,

    forgotPasswordRequest: false,
    forgotPasswordRequestFailed: false,

    resetPasswordRequest: false,
    resetPasswordRequestFailed: false,
};

export const userRequestReducer = (state = initialState, action) => {
    switch(action.type) {
        case REGISTRATION: 
            return {
                ...state,
                registrationRequest: true,
                registrationRequestFailed: false,
                isAuthChecked: false,
            }
        case REGISTRATION_SUCCESS: 
            return {
                ...state,
                registrationRequest: true,
                userInfo: action.payload.user,
                isAuthChecked: true,
            }
        case REGISTRATION_FAILED: 
            return {
                ...state,
                registrationRequest: false,
                registrationRequestFailed: true,
                isAuthChecked: false,
            }

        case LOGIN: 
            return {
                ...state,
                loginRequest: true,
                loginRequestFailed: false,
                isAuthChecked: false,
            }
        case LOGIN_SUCCESS: 
            return {
                ...state,
                loginRequest: true,
                userInfo: action.payload.user,
                isAuthChecked: true,
            }
        case LOGIN_FAILED: 
            return {
                ...state,
                loginRequest: false,
                loginRequestFailed: true,
                isAuthChecked: false,
            }
        case LOGOUT:
            return {
                ...state,
                logoutRequest: true,
                logoutRequestFailed: false,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                logoutRequest: false,
                userData: action.payload,
                isAuthChecked: true,
            }
        case LOGOUT_FAILED:
            return {
                ...state,
                logoutRequest: false,
                logoutRequestFailed: true,
                isAuthChecked: false,
            }
        case GET_USER:
            return {
                ...state,
                getUserRequest: true,
                getUserRequestFailed: false,
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                getUserRequest: false,
                userInfo: action.payload
            }
        case GET_USER_FAILED: 
            return {
                ...state,
                getUserRequest: false,
                getUserRequestFailed: true,
            }
        case AUTH_CHECKED:
            return {
                ...state,
                isAuthChecked: true,
            }
        default:
            return state
    }
};