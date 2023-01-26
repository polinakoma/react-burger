import { SetStateAction } from 'react';
import { request, BURGER_API_URL } from '../constants/constants';
import { AppDispatch } from '../types';
import { IIngredient } from '../types/data';


// BurgerIngredients
export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const CHOOSE_INGREDIENT = 'CHOOSE_INGREDIENT';

// Order
export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

// BurgerConstructor
export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const CONSTRUCTOR_DELETE = 'CONSTRUCTOR_DELETE';
export const CONSTRUCTOR_RESET = 'CONSTRUCTOR_RESET';
export const CONSTRUCTOR_REORDER = 'CONSTRUCTOR_REORDER';

// Modal
export const SET_MODAL = 'SET_MODAL';
export const RESET_MODAL = 'RESET_MODAL';


export const getIngredientsData = () => (dispatch: AppDispatch) => {
    dispatch({
        type: GET_INGREDIENTS
    });
    request(`${BURGER_API_URL}/ingredients`)
    .then((res) => {
        if(res) {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                payload: res.data,
            })
        }
    })
    .catch(() => {
        dispatch({
            type: GET_INGREDIENTS_FAILED
        })
    })     
};

export const getOrderNumber = (data: { ingredients: string[] } | undefined,   
    onCreateOrderCallback: { (value: SetStateAction<number | undefined>): void; (arg0: any): void; }, 
    accessToken?: string) => 
(dispatch: AppDispatch) => {
    dispatch({
        type: CREATE_ORDER_REQUEST
    });
    request(`${BURGER_API_URL}/orders`, {
        method: 'POST',
        headers: {
            "Content-type": 'application/json',
            "Authorization": accessToken,
            },
        body: JSON.stringify(data)
    })
    .then(res => {
        if(res.success) {
            dispatch({
                type: CREATE_ORDER_SUCCESS,
                payload: res.order
            })
            onCreateOrderCallback(res.order.number);
            dispatch({
                type: CONSTRUCTOR_RESET
            })
        };
    })
    .catch(() => {
        dispatch({
            type: CREATE_ORDER_FAILED
        })
    })
};

export const handleDeleteConstructor = (ingredient: IIngredient) => (dispatch: AppDispatch) => {
    dispatch({
        type: CONSTRUCTOR_DELETE,
        payload: ingredient.key,
    })
};