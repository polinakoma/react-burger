import { 
    ADD_INGREDIENT_TO_CONSTRUCTOR, CONSTRUCTOR_DELETE, 
    CONSTRUCTOR_REORDER, CONSTRUCTOR_RESET } 
    from '../actions/ingredients';
import { TIngredientsActions } from '../actions/ingredients';
import { IIngredient } from '../types/data';

  
export type TConstructorState = {
    bun: IIngredient | null, 
    ingredients: IIngredient[]; 
};

const initialState: TConstructorState = {
    bun: null, 
    ingredients: [],
};

export const constructorIngredientsReducer = (state = initialState, 
    action: TIngredientsActions): TConstructorState => {
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
                bun: null, 
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

