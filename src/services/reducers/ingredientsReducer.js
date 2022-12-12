import { GET_INGREDIENTS, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED, 
CHOOSE_INGREDIENT } from '../actions/ingredients.js';


const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    chosenIngredient: []
};

export const ingredientsReducer = (state = initialState, action) => {
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