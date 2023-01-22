import { 
    LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, LOGOUT_SUCCESS, 
    LOGOUT_FAILED, REGISTRATION, REGISTRATION_SUCCESS, REGISTRATION_FAILED, 
    FORGOT_PASSWORD, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED, 
    RESET_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED, 
    GET_USER, GET_USER_SUCCESS, GET_USER_FAILED, AUTH_CHECKED, 
    UPDATE_USER_DATA, UPDATE_USER_DATA_SUCCESS, UPDATE_USER_DATA_FAILED 
} from '../actions/userRequests';
import { TUserRequestsActions } from '../types/data';


export type TUserState = {
    isAuthChecked: boolean;
    userInfo: {
        email: string;
        password: string;
        name: string;
    } | null;

    registrationRequest: boolean;
    registrationRequestFailed: boolean;

    loginRequest: boolean;
    loginRequestFailed: boolean;

    getUserRequest: boolean;
    getUserRequestFailed: boolean;

    updateUserRequest: boolean;
    updateUserRequestFailed: boolean;
    
    logoutRequest: boolean;
    logoutRequestFailed: boolean;

    forgotPasswordRequest: boolean;
    forgotPasswordRequestFailed: boolean;
    email: boolean;

    resetPasswordRequest: boolean;
    resetPasswordRequestFailed: boolean;
};

const initialState: TUserState = {
    isAuthChecked: false,
    userInfo: null,

    registrationRequest: false,
    registrationRequestFailed: false,

    loginRequest: false,
    loginRequestFailed: false,

    getUserRequest: false,
    getUserRequestFailed: false,

    updateUserRequest: false,
    updateUserRequestFailed: false,
    
    logoutRequest: false,
    logoutRequestFailed: false,

    forgotPasswordRequest: false,
    forgotPasswordRequestFailed: false,
    email: false,

    resetPasswordRequest: false,
    resetPasswordRequestFailed: false,
};

export const userRequestReducer = (state = initialState, 
    action: TUserRequestsActions): TUserState => {
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
                userInfo: {
                    email: action.payload.email,
                    name: action.payload.name,
                    password: '',
                },
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
                userInfo: {
                    email: action.payload.email,
                    name: action.payload.name,
                    password: '',
                },
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
                logoutRequest: true,
                userInfo: null,
                isAuthChecked: false,
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
                userInfo: {
                    email: action.payload.email,
                    password: '',
                    name: action.payload.name,
                },   
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
        case UPDATE_USER_DATA:
            return {
                ...state,
                updateUserRequest: true,
                updateUserRequestFailed: false,
            }
        case UPDATE_USER_DATA_SUCCESS:
            return {
                ...state,
                updateUserRequest: false,
                userInfo: {
                    email: action.payload.email,
                    password: '',
                    name: action.payload.name,
                },   
            }
        case UPDATE_USER_DATA_FAILED:
            return {
                ...state,
                updateUserRequest: false,
                updateUserRequestFailed: true,
            }
        case FORGOT_PASSWORD:
            return {
                ...state,
                forgotPasswordRequest: true,
                forgotPasswordRequestFailed: false,

            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                forgotPasswordRequest: false,
                email: action.payload,
            }
        case FORGOT_PASSWORD_FAILED:
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordRequestFailed: true,
            } 
        case RESET_PASSWORD:
            return {
                ...state,
                resetPasswordRequest: true,
                resetPasswordRequestFailed: false,

            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPasswordRequest: false,
            }
        case RESET_PASSWORD_FAILED:
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordRequestFailed: true,
            } 
        default:
            return state
    }
};