import { GET_INGREDIENTS, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED,
    ADD_INGREDIENT_TO_CONSTRUCTOR, CONSTRUCTOR_DELETE, CONSTRUCTOR_REORDER, 
    CONSTRUCTOR_RESET, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, 
    CREATE_ORDER_FAILED, SET_INGREDIENT_MODAL, RESET_INGREDIENT_MODAL, 
    CHOOSE_INGREDIENT } 
from '../actions/ingredients.js'


const ingredientsInitialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    chosenIngredient: []
};

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
    switch(action.type) {
        case GET_INGREDIENTS:
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false
            }
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredients: action.payload,
                ingredientsRequest: false
            }
        case GET_INGREDIENTS_FAILED:
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true
            }
        case CHOOSE_INGREDIENT:
            return {
                chosenIngredient: action.payload
            }
        default:
            return state;
    };
};

const ingredientInfoInitialState = {
    currentIngredient: null
};

export const ingredientInfoReducer = (state = ingredientInfoInitialState, action) => {
    switch(action.type) {
        case SET_INGREDIENT_MODAL:
            return {
                ...state,
                currentIngredient: action.payload
            }
        case RESET_INGREDIENT_MODAL:
            return {
                ...state,
                currentIngredient: null
            }
        default:
            return state;
    };
}

const orderInitialState = {
    orderNumber: '',
    orderRequest: false,
    orderNumberReceiveFailed: false
};

export const orderReducer = (state = orderInitialState, action) => {
    switch(action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                orderRequest: true,
                orderNumberReceiveFailed: false
            }
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                orderNumber: action.payload,
                orderRequest: false
            }
        case CREATE_ORDER_FAILED:
            return {
                ...state,
                orderRequest: false,
                orderNumberReceiveFailed: true
            }
        default:
            return state;
    };
}   

const constructorIngredientsInitialState = {
        bun: [], 
        ingredients: [],
};

export const constructorIngredientsReducer = (state = constructorIngredientsInitialState, 
    action) => {
    switch(action.type) {
        case ADD_INGREDIENT_TO_CONSTRUCTOR:
            if(action.payload.type === 'bun') {
            return {
                ...state,
                bun: action.payload
            }
        } 
        return {
            ...state,
            ingredients: [...state.ingredients, action.payload],
            uuid: action.uuid
        } 
        case CONSTRUCTOR_DELETE:
            return {
                ...state,
                ingredients: [...state.ingredients.filter((item) => item.key !== action.payload)],
            }
        case CONSTRUCTOR_RESET:
            return {
                bun: [], 
                ingredients: [],
            }
        case CONSTRUCTOR_REORDER:
            const ingredients = [...state.ingredients]
            ingredients.splice(action.hoverIndex, 0, ingredients.splice(action.dragIndex, 1)[0])
            return {
                ...state,
                ingredients: ingredients
            }
        default:
            return state;
    };
};

