import {
    WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_ALL_ORDERS
} from '../actions/wsActionTypes.js';


const initialState = {
    wsConnected: false,
    error: '',

    allOrders: [],
    totalOrders: 0,
    todayTotalOrders: 0,

}; 

export const wsReducer = (state = initialState, action) => {
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
                allOrders: null,
                totalOrders: 0,
                todayTotalOrders: 0,
            }
        case WS_GET_ALL_ORDERS:
            return {
                ...state,
                error: undefined,
                allOrders: action.payload.orders,
                totalOrders: action.payload.total,
                todayTotalOrders: action.payload.totalToday,
            }
        default:
            return state;
    }
}; 


export default wsReducer;