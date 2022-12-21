import styles from './OrderLine.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import bun from '../../images/bun1.svg';
import { useEffect } from 'react';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START, WS_GET_ALL_ORDERS } from '../../services/actions/wsActionTypes.js';
import { useDispatch, useSelector } from 'react-redux';


export const OrderLine = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START
        })
    }, [dispatch]);


    // const allOrders = useSelector((state) => state.wsReducer.allOrders);
    // console.log(allOrders)

    return (
        <main className={styles.main}>
            <h1 className={`${styles.heading} mt-10 mb-5`}>Лента заказов</h1>
            <div className={styles.container}>
                <section className={`${styles.orderLine} mr-15`}>

                    {/* { allOrders.map((order, id) => {
                        <Link to='/feed/:id' key={id}>
                            <div className={`${styles.orderItem} pt-6 pl-6 pr-6 pb-6 mb-4`}>
                                <div className={styles.orderDetails}>
                                    <p className={styles.orderNumber}>#034535</p>
                                    <p className={styles.orderDate}>Сегодня, 16:20 i-GMT+3</p>
                                </div>
                                <h2 className={`${styles.orderTitle} mt-6 mb-6`}>Death Star Starship Main бургер</h2>
                                <div className={styles.orderInfo}>
                                    <div className={styles.orderImage}>
                                        <img src={bun} alt='ингредиент'></img>
                                        <img src={bun} alt='ингредиент'></img>
                                        <img src={bun} alt='ингредиент'></img>
                                        <img src={bun} alt='ингредиент'></img>
                                    </div>
                                    <div className={styles.orderPrice}>
                                        <p>480</p>
                                        <CurrencyIcon/>
                                    </div>
                                </div>   
                            </div>
                        </Link>
                    })
                    }   */}
                    
                </section>

                <section className={styles.statistics}>
                    <div className={`${styles.oredsStatistics}  mb-15`}>
                        <div className={`${styles.oredsInfo} mr-9`}>
                            <h3 className={`${styles.title} mb-6`}>Готовы:</h3>
                            <p className={`${styles.orderNumbers} mb-2`}>034533</p>
                            <p className={`${styles.orderNumbers} mb-2`}>034533</p>
                            <p className={`${styles.orderNumbers} mb-2`}>034533</p>
                            <p className={`${styles.orderNumbers} mb-1`}>034533</p>
                        </div>
                        <div className={styles.oredsInfo}>
                            <h3 className={styles.title}>В работе:</h3>
                            <p className={`${styles.orderNumbers_white} mb-2`}>034533</p>
                            <p className={`${styles.orderNumbers_white} mb-2`}>034533</p>
                            <p className={`${styles.orderNumbers_white} mb-2`}>034533</p>
                        </div>
                    </div>

                    <div className='mb-15'>
                        <h3 className={`${styles.title} mb-1`}>Выполнено за все время:</h3>
                        <p className={`${styles.digits} text text_type_digits-large`}>28 752</p>
                    </div>
                    <div>
                        <h3 className={`${styles.title} mb-1`}>Выполнено за сегодня:</h3>
                        <p className={`${styles.digits} text text_type_digits-large`}>138</p>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default OrderLine;