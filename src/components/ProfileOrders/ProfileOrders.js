import styles from './ProfileOrders.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCookie } from '../../utils/cookie';
import { WS_CONNECTION_START } from '../../services/actions/wsActionTypes.js';
import { OrderItem } from '../OrderItem/OrderItem';
import ProfileMenu from '../ProfileMenu/ProfileMenu';


export const ProfileOrders = () => {

    const dispatch = useDispatch();
    const accessToken = getCookie('accessToken');

    useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START,
            payload: `wss://norma.nomoreparties.space/orders?token=${accessToken?.replace('Bearer ', '')}`
        })
    }, [dispatch, accessToken]);

    const allOrders = useSelector((state) => state.wsReducer.allOrders);

    return (
        <div className={styles.container}> 
            <ProfileMenu />
            <ul className={styles.listOfOrders}>
                {allOrders.map((order, index) => {
                    return (
                        <li key={index}>
                            <OrderItem order={order}/>
                        </li>
                        
                    )
                })}
            </ul>
        </div>
    )
};


export default ProfileOrders;