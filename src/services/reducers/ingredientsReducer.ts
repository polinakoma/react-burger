import { 
    GET_INGREDIENTS, GET_INGREDIENTS_SUCCESS, 
    GET_INGREDIENTS_FAILED, CHOOSE_INGREDIENT } 
    from '../actions/ingredients';
import { TIngredientsActions } from '../types/data';
import { IIngredient } from '../types/data';


export type TIngredientsState = {
    ingredients: IIngredient[];
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
    chosenIngredient: IIngredient | null;
};

const initialState: TIngredientsState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    chosenIngredient: null
};

export const ingredientsReducer = (state = initialState, 
    action: TIngredientsActions): TIngredientsState => {
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
                ...state,
                chosenIngredient: action.payload,
            }
        default:
            return state;
    };
};