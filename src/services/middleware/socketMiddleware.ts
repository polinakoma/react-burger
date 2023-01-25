import { Middleware } from "redux";
import { RootState } from "../types";
import { IWSActions } from "../types/data";


export const socketMiddleware = (wsActionsAllOrders: IWSActions): Middleware<{}, RootState> => {
    return ((store) => {
        let socket: WebSocket | null = null;
        let url = '';

        return (next) => (action) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsInit, onOpen, onClose, onError, onMessage } = wsActionsAllOrders;
        
            if (type === wsInit) {
                url = payload;
                socket = new WebSocket(url);
            };
            if (type === onClose) {
                socket && socket.close(1000, 'CLOSE_NORMAL')
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
            };
        next(action);
    }
    })
}; 