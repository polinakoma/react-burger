import { TIngredientsActions } from './data';
import { TUserRequestsActions } from './data';
import { TWsTypesActions } from './data';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { rootReducers } from '../reducers';

// типизация хранилища
export type RootState = ReturnType<typeof rootReducers>;

// типизация всех экшенов
export type TApplicationActions = 
    | TIngredientsActions 
    | TUserRequestsActions 
    | TWsTypesActions;

// типизация thunk услилителя
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, 
RootState, unknown, TApplicationActions>; 

// типизация метода dispatch для проверки отправляемого экшена
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;