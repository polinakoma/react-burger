import { BURGER_API_URL } from '../../utils/constans.js';
import { checkReponse } from '../../utils/burger-api.js'


// для БургерИгредиента
export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const CHOOSE_INGREDIENT = 'CHOOSE_INGREDIENT';

// для Заказа
export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

// для Конструктора
export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const CONSTRUCTOR_DELETE = 'CONSTRUCTOR_DELETE';
export const CONSTRUCTOR_RESET = 'CONSTRUCTOR_RESET';
export const CONSTRUCTOR_REORDER = 'CONSTRUCTOR_REORDER';

// для Попапа Ингредиента
export const SET_INGREDIENT_MODAL = 'SET_INGREDIENT_MODAL';
export const RESET_INGREDIENT_MODAL = 'RESET_INGREDIENT_MODAL';


export const getIngredientsData = () => {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS
          });
          fetch(`${BURGER_API_URL}/ingredients`)
          .then((res) => checkReponse(res))
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
    }      
};

export const getOrderNumber = (data, func) => {
    return function (dispatch) {
        dispatch({
            type: CREATE_ORDER_REQUEST
        });
        fetch(`${BURGER_API_URL}/orders`, {
            method: 'POST',
            headers: {
                "Content-type": 'application/json'
              },
            body: JSON.stringify(data)
        })
        .then((res) => checkReponse(res))
        .then(res => {
            if(res.success) {
                dispatch({
                    type: CREATE_ORDER_SUCCESS,
                    payload: res.order
                })

                func(res.order.number)

                dispatch({
                    type: CONSTRUCTOR_RESET
                })
            }
        })
        .catch(() => {
            alert('Не удалось создать заказ')
            dispatch({
                type: CREATE_ORDER_FAILED
            })
        })
    }
};