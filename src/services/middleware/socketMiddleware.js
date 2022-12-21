import { getCookie } from "../../utils/cookie";
import { wsUrlAllOrders } from '../../utils/constans.js'


export const socketMiddleware = (wsActionsAllOrders) => {
    return ((store) => {
        let socket = null;

        return next => (action) => {
            const { dispatch, getState } = store;
            const { type, payload } = action;
            const { wsInit, onOpen, onClose, onError, onMessage } = wsActionsAllOrders;
            // const accessToken = getCookie('accessToken')
        
            if (type === wsInit) {
                socket = new WebSocket(wsUrlAllOrders);
            }

            if (socket) {

                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch({type: onMessage, payload: parsedData});
                };

                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };
        }
        next(action);
    };
    })
}; 
    
