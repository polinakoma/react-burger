import { WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, 
    WS_GET_ALL_ORDERS } from '../actions/wsActionTypes';
import { TWsTypesActions } from '../types/data';
import { IOrder } from '../types/data';


export type TwsReducerState = {
    wsConnected: boolean;
    error: string;
    allOrders: ReadonlyArray<IOrder>; 
    totalOrders: number;
    todayTotalOrders: number;
};

const initialState: TwsReducerState = {
    wsConnected: false,
    error: '',
    allOrders: [],
    totalOrders: 0,
    todayTotalOrders: 0,
}; 

export const wsReducer = (state = initialState, action: TWsTypesActions): TwsReducerState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: '',
                wsConnected: true
            }
        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            }
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                error: '',
                wsConnected: false,
                allOrders: [],
                totalOrders: 0,
                todayTotalOrders: 0,
            }
        case WS_GET_ALL_ORDERS:
            return {
                ...state,
                error: '',
                allOrders: action.payload.orders,
                totalOrders: action.payload.total,
                todayTotalOrders: action.payload.totalToday,
            }
        default:
            return state;
    }
}; 


export default wsReducer;