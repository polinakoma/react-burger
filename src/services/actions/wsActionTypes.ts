export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS'; 
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_GET_ALL_ORDERS: 'WS_GET_ALL_ORDERS' = 'WS_GET_ALL_ORDERS';


export interface IWsConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START;
};
export interface IWsConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
};
export interface IWsConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
};
export interface IWsConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
};
export interface IWsGetAllOrdersAction {
    readonly type: typeof WS_GET_ALL_ORDERS;
};

export type TWsTypesActions =
| IWsConnectionStartAction
| IWsConnectionClosedAction
| IWsConnectionSuccessAction
| IWsConnectionErrorAction
| IWsGetAllOrdersAction;
