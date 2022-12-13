import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, 
CREATE_ORDER_FAILED } from '../actions/ingredients.js';     


const initialState = {
    orderNumber: '',
    orderRequest: false,
    orderNumberReceiveFailed: false,
    isFetching: false
};

export const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                orderRequest: true,
                orderNumberReceiveFailed: false,
                isFetching: true
            }
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                orderNumber: action.payload,
                orderRequest: false,
                isFetching: false
            }
        case CREATE_ORDER_FAILED:
            return {
                ...state,
                orderRequest: false,
                orderNumberReceiveFailed: true,
                isFetching: false
            }
        default:
            return state;
    };
};