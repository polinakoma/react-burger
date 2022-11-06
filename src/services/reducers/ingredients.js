import { GET_INGREDIENTS, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED,
    ADD_INGREDIENT_TO_CONSTRUCTOR, CONSTRUCTOR_DELETE, CONSTRUCTOR_REORDER, 
    CONSTRUCTOR_RESET, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, 
    CREATE_ORDER_FAILED, SET_INGREDIENT_MODAL, RESET_INGREDIENT_MODAL } 
from '../actions/ingredients.js'


const ingredientsInitialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false
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
    orderNumber: null,
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



// не работающий код

const constructorIngredientsInitialState = {
        bun: [], 
        ingredients: []
};

export const constructorIngredientsReducer = (state = constructorIngredientsInitialState, 
    action) => {
    switch(action.type) {
        case ADD_INGREDIENT_TO_CONSTRUCTOR:
            if(action.payload.type === 'bun') {
            return {
                ...state,
                bun: action.payload,
            }
        } 
        return {
            ...state,
            ingredients: [...state.ingredients, action.payload]
        } 
        default:
            return state;
    };
};

