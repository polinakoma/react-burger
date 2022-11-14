import { ADD_INGREDIENT_TO_CONSTRUCTOR, CONSTRUCTOR_DELETE, 
CONSTRUCTOR_REORDER, CONSTRUCTOR_RESET } from '../actions/ingredients.js';
  

const initialState = {
        bun: false, 
        ingredients: [],
};

export const constructorIngredientsReducer = (state = initialState, action) => {
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
            ingredients: [...state.ingredients, action.payload]
        } 
        case CONSTRUCTOR_DELETE:
            return {
                ...state,
                ingredients: [...state.ingredients.filter((item) => item.key !== action.payload)],
            }
        case CONSTRUCTOR_RESET:
            return {
                bun: [], 
                ingredients: []
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

