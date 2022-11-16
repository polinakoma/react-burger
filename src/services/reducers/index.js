import { combineReducers } from 'redux';
import { constructorIngredientsReducer } from './constructorIngredientsReducer.js';
import { ingredientsReducer } from './ingredientsReducer.js';
import { ingredientInfoReducer } from './ingredientInfoReducer.js';
import { orderReducer } from './orderReducer.js';


export const rootReducers = combineReducers({
    ingredientsReducer, 
    constructorIngredientsReducer, 
    ingredientInfoReducer, 
    orderReducer,
});
