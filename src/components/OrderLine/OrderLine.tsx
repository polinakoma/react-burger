import styles from './OrderLine.module.css';
import OrderItem from '../OrderItem/OrderItem';
import { FC, useEffect } from 'react';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } 
from '../../services/actions/wsActionTypes';
import { useDispatch, useSelector } from '../../services/hooks';
import { WEB_SOCKET_URL } from '../../services/constants/constants';
import { IOrder } from '../../services/types/data';


const OrderLine: FC = () => { 

    const dispatch = useDispatch();

    const allOrders = useSelector((state) => state.wsReducer.allOrders);
    const totalOrders = useSelector((state) => state.wsReducer.totalOrders);
    const todayTotalOrders = useSelector((state) => state.wsReducer.todayTotalOrders);

    useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START,
            payload: `${WEB_SOCKET_URL}/all`
        })
        return () => {
            dispatch({
                type: WS_CONNECTION_CLOSED
            })
        }
    }, [dispatch]);

    return (
        <main className={styles.main}>
            <h1 className={`${styles.heading} mt-10 mb-5`}>Лента заказов</h1>
            <div className={styles.container}>
                <ul className={`${styles.orderLine} mr-15`}>
                    { allOrders?.map((order: IOrder) => {
                        return (
                            <li key={order._id}>
                                <OrderItem order={order}/>
                            </li>
                        )
                    })}
                </ul>
                <section className={styles.statistics}>
                    <div className={`${styles.orderStatistics}  mb-15`}>
                        <div className={`${styles.orderInfo} mr-9`}>
                            <h3 className={`${styles.title} mb-6`}>Готовы:</h3>
                            <ul className={styles.list}>
                                { allOrders?.map((order: IOrder) => {
                                    if(order.status === 'done') {
                                        return (
                                            <li className={styles.orderNumbers}
                                            key={order._id}>
                                            {order.number}
                                            </li>
                                        )
                                    }
                                })}
                            </ul>
                        </div>
                        <div className={styles.oredsInfo}>
                            <h3 className={styles.title}>В работе:</h3>
                            <ul className={styles.list}>
                                { allOrders?.map((order: IOrder) => {
                                    if(order.status === 'pending') {
                                        return (
                                            <li className={`${styles.orderNumbers_white} mb-2`}
                                            key={order._id}>
                                            {order.number}
                                            </li>
                                        )
                                    }
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className='mb-15'>
                        <h3 className={`${styles.title} mb-1`}>Выполнено за все время:</h3>
                        <p className={`${styles.digits} text text_type_digits-large`}>{totalOrders}</p>
                    </div>
                    <div>
                        <h3 className={`${styles.title} mb-1`}>Выполнено за сегодня:</h3>
                        <p className={`${styles.digits} text text_type_digits-large`}>{todayTotalOrders}</p>
                    </div>
                </section>
            </div>
        </main>
    )
};

export default OrderLine;