import { SET_MODAL, RESET_MODAL } from '../actions/ingredients.js';


const initialState = {
    current: null    
};

export const ingredientInfoReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_MODAL:
            return {
                ...state,
                current: action.payload
            }
        case RESET_MODAL:
            return {
                ...state,
            }
        default:
            return state;
    };
};