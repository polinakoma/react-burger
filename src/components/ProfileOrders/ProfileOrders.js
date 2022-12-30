import styles from './ProfileOrders.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCookie } from '../../utils/cookie.js';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } 
from '../../services/actions/wsActionTypes.js';
import { OrderItem } from '../OrderItem/OrderItem';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { WEB_SOCKET_URL } from '../../utils/constans';


export const ProfileOrders = () => {

    const dispatch = useDispatch();
    const accessToken = getCookie('accessToken');

    useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START,
            payload: `${WEB_SOCKET_URL}?token=${accessToken?.replace('Bearer ', '')}`
        })
        return () => {
            dispatch({
                type: WS_CONNECTION_CLOSED
            })
        }
    }, [dispatch, accessToken]);

    const allOrders = useSelector((state) => state.wsReducer.allOrders);

    return (
        <div className={styles.container}> 
            <ProfileMenu />
            <ul className={styles.listOfOrders}>
                {allOrders?.map((order) => {
                    return (
                        <li key={order._id}>
                            <OrderItem order={order}/>
                        </li>
                        
                    )
                })}
            </ul>
        </div>
    )
};


export default ProfileOrders;