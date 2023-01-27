import { SET_MODAL, RESET_MODAL } from '../actions/ingredients';
import { TIngredientsActions, IIngredient } from '../types/data';


export type TIngredientInfoState = {
    current: IIngredient | number | null;  
};

const initialState: TIngredientInfoState = {
    current: null   
};

export const ingredientInfoReducer = (state = initialState, 
    action: TIngredientsActions): TIngredientInfoState => {
    switch(action.type) {
        case SET_MODAL:
            return {
                ...state,
                current: action.payload
            }
        case RESET_MODAL:
            return {
                ...state,
                current: null
            }
        default:
            return state;
    };
};