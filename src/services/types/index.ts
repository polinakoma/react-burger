import store from '../store';
import { TIngredientsActions } from './data';
import { TUserRequestsActions } from './data';
import { TWsTypesActions } from './data';
import { ActionCreator, Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

// типизация хранилища
export type RootState = ReturnType<typeof store.getState>;

// типизация всех экшенов
export type TApplicationActions = 
    | TIngredientsActions 
    | TUserRequestsActions 
    | TWsTypesActions;

// типизация thunk услилителя
export type AppThunk<TReturn = void> = ActionCreator<
ThunkAction<TReturn, RootState, Action, TApplicationActions>>; 

// типизация метода dispatch для проверки отправляемого экшена
export type AppDispatch = Dispatch<TApplicationActions>; 