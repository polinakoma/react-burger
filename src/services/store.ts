import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducers } from './reducers/index'; 
import { composeWithDevTools } from 'redux-devtools-extension';
import { socketMiddleware } from './middleware/socketMiddleware';
import { IWSActions } from './types/data'
import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_ALL_ORDERS } from './actions/wsActionTypes';


const wsActionsAllOrders: IWSActions = {
    wsInit: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_ALL_ORDERS
};

const enhancers = composeWithDevTools(applyMiddleware(thunk, 
    socketMiddleware(wsActionsAllOrders)
    ));

const store = createStore(rootReducers, enhancers);


export default store;