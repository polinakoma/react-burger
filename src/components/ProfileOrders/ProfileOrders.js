import styles from './ProfileOrders.module.css';
import { Link } from 'react-router-dom';
import bun from '../../images/bun1.svg';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const ProfileOrders = () => {


    return (
        <div className={styles.container}> 
            <Link to='/profile/orders/:id' >
                <div className={`${styles.orderItem} pt-6 pl-6 pr-6 pb-6 mb-6`}>
                    <div className={styles.orderDetails}>
                        <p className={styles.orderNumber}>#034535</p>
                        <p className={styles.orderDate}>Сегодня, 16:20 i-GMT+3</p>
                    </div>
                    <h2 className={`${styles.orderTitle} mt-6 mb-2`}>Death Star Starship Main бургер</h2>
                    <p className={`${styles.orderStatus} mb-6`}>Создан</p>
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
        </div>

    )
};


export default ProfileOrders;