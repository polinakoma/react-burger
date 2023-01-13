import { request, BURGER_API_URL } from '../constants/constants';
import { AppDispatch, AppThunk } from '../types';
import { IIngredient } from '../types/data';
import { IOrder } from '../types/data';


// для БургерИгредиента
export const GET_INGREDIENTS: 'GET_INGREDIENTS' = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
export const CHOOSE_INGREDIENT: 'CHOOSE_INGREDIENT' = 'CHOOSE_INGREDIENT';

// для Заказа
export const CREATE_ORDER_REQUEST: 'CREATE_ORDER_REQUEST' = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS' = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED: 'CREATE_ORDER_FAILED' = 'CREATE_ORDER_FAILED';

// для Конструктора
export const ADD_INGREDIENT_TO_CONSTRUCTOR: 'ADD_INGREDIENT_TO_CONSTRUCTOR' = 
'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const CONSTRUCTOR_DELETE: 'CONSTRUCTOR_DELETE' = 'CONSTRUCTOR_DELETE';
export const CONSTRUCTOR_RESET: 'CONSTRUCTOR_RESET' = 'CONSTRUCTOR_RESET';
export const CONSTRUCTOR_REORDER: 'CONSTRUCTOR_REORDER' = 'CONSTRUCTOR_REORDER';

// для Модального окна
export const SET_MODAL: 'SET_MODAL' = 'SET_MODAL';
export const RESET_MODAL: 'RESET_MODAL' = 'RESET_MODAL';


export interface IGetIngredientsAction {
    readonly type: typeof GET_INGREDIENTS;
};
export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly payload: IIngredient[];
};
export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
};
export interface IChooseIngredientAction {
    readonly type: typeof CHOOSE_INGREDIENT;
};
export interface ICreateOrderRequestAction {
    readonly type: typeof CREATE_ORDER_REQUEST;
};
export interface ICreateOrderSuccessAction {
    readonly type: typeof CREATE_ORDER_SUCCESS;
    readonly payload: IOrder;
};
export interface ICreateOrderFailedAction {
    readonly type: typeof CREATE_ORDER_FAILED;
};
export interface IAddIngredientToConstructorAction {
    readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
    readonly payload: IIngredient;
};
export interface IConstructorDeleteAction {
    readonly type: typeof CONSTRUCTOR_DELETE;
    readonly payload: string;
};
export interface IConstructorResetAction  {
    readonly type: typeof CONSTRUCTOR_RESET;
};
export interface IConstructorReorderAction  {
    readonly type: typeof CONSTRUCTOR_REORDER;
    readonly payload: number;
};
export interface ISetModalAction  {
    readonly type: typeof SET_MODAL;
};
export interface IResetModalAction  {
    readonly type: typeof RESET_MODAL;
};

export type TIngredientsActions =
    | IChooseIngredientAction 
    | IGetIngredientsFailedAction 
    | IGetIngredientsSuccessAction 
    | IGetIngredientsAction
    | ICreateOrderRequestAction
    | ICreateOrderSuccessAction
    | ICreateOrderFailedAction
    | IAddIngredientToConstructorAction
    | IConstructorDeleteAction
    | IConstructorResetAction 
    | IConstructorReorderAction
    | ISetModalAction
    | IResetModalAction;


export const getIngredientsData: AppThunk = () => (dispatch: AppDispatch) => {
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

export const getOrderNumber: AppThunk = (accessToken, data, onCreateOrderCallback) => 
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

            onCreateOrderCallback(res.order.number)

            dispatch({
                type: CONSTRUCTOR_RESET
            })
        }
    })
    .catch(() => {
        dispatch({
            type: CREATE_ORDER_FAILED
        })
    })
};