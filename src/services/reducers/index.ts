import { combineReducers } from 'redux';
import { constructorIngredientsReducer } from './constructorIngredientsReducer';
import { ingredientsReducer } from './ingredientsReducer';
import { ingredientInfoReducer } from './ingredientInfoReducer';
import { orderReducer } from './orderReducer';
import { userRequestReducer } from './userRequests';
import { wsReducer } from './allOrdersReducer'


export const rootReducers = combineReducers({
    ingredientsReducer, 
    constructorIngredientsReducer, 
    ingredientInfoReducer, 
    orderReducer,
    userRequestReducer,
    wsReducer,
});
