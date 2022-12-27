import { SET_INGREDIENT_MODAL, RESET_INGREDIENT_MODAL } 
from '../actions/ingredients.js';


const initialState = {
    currentIngredient: null    
};

export const ingredientInfoReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_INGREDIENT_MODAL:
            return {
                ...state,
                currentIngredient: action.payload
            }
        case RESET_INGREDIENT_MODAL:
            return {
                ...state,
               // currentIngredient: null
            }
        default:
            return state;
    };
};