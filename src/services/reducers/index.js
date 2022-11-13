import { combineReducers } from 'redux';
import { ingredientsReducer, constructorIngredientsReducer, 
ingredientInfoReducer, orderReducer } from './ingredients.js';


export const rootReducers = combineReducers({
    ingredientsReducer, 
    constructorIngredientsReducer, 
    ingredientInfoReducer, 
    orderReducer,
});
