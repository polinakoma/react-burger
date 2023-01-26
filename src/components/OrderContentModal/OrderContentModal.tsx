import styles from './OrderContentModal.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../services/hooks';
import { getOrderTime, WEB_SOCKET_URL, getOrderStatus } 
from '../../services/constants/constants';
import { useParams } from 'react-router-dom';
import { WS_CONNECTION_START } from '../../services/actions/wsActionTypes';
import { FC, useEffect } from 'react';
import { getCookie } from '../../utils/cookie';
import { useLocation } from 'react-router-dom';
import { IIngredient, IOrder, IOrderContentModalProps } from '../../services/types/data';


const OrderContentModal: FC<IOrderContentModalProps> = ({isModal}) => {
    
    const { id } = useParams<{id?: string}>();

    const dispatch = useDispatch();
    const location = useLocation();

    const accessToken = getCookie('accessToken');

    useEffect(() => {
        if(location.pathname.includes('/profile/orders') && isModal === false) {
            dispatch({
                type: WS_CONNECTION_START,
                payload: `${WEB_SOCKET_URL}?token=${accessToken?.replace('Bearer ', '')}`
            })
        } else if(location.pathname.includes('/feed') && isModal === false) {
            dispatch({
                type: WS_CONNECTION_START,
                payload: `${WEB_SOCKET_URL}/all`
            })
        }
    }, [dispatch, accessToken, location.pathname]);

    const allOrders = useSelector((state) => state.wsReducer.allOrders);
    const allIngredients = useSelector((state) => state.ingredientsReducer.ingredients);

    const orderItem = allOrders.find((order: IOrder) => order._id === id);
 
    const orderIngredients = orderItem?.ingredients.reduce((prev: IIngredient[], curr) => {
        const current = allIngredients.find((item) => item._id === curr);
        return current ? [...prev, current] : prev;
    }, []);

    const uniqueIngredient = Array.from(new Set(orderIngredients)) as IIngredient[];

    const ingredientCounter = (ingredient: IIngredient) => {
        let counter = 0;
        orderIngredients?.forEach((item: any) => {
            if(item?._id === ingredient?._id) {
                counter += 1
            }
        })
        return counter;
    };

    const calculateSum = () => {
        let sum = 0;
        orderIngredients?.forEach((ingredient: any) => {
          const orderedIngredient = allIngredients.find((item: IIngredient) => 
          item?._id === ingredient?._id)
          if (orderedIngredient?.price) {
            sum += orderedIngredient?.price
          }
        })
        return sum;
    };


    return (
        <>
            { orderItem && (
                <div className={styles.container}>
                    <p className={`${styles.orderNumber} mb-10`}>{`#${orderItem?.number}`}</p>
                    <h1 className={styles.orderTitle}>{orderItem.name}</h1>
                    <p className={`${styles.orderStatus} mb-15`}>{getOrderStatus(orderItem.status)}</p>
                    <p className={styles.orderContent}>Состав:</p>
                    <ul className={styles.ingredientArea}>
                        {uniqueIngredient.map((ingredient: IIngredient) => {
                            return (
                                <li className={`${styles.orderIngredient} mb-6`} key={ingredient?._id}>
                                    <div className={styles.block}>
                                        <img src={ingredient?.image_mobile} alt={ingredient?.name} 
                                        className={styles.itemImage}></img>
                                        <p className={`${styles.orderIngredientTitle} ml-4`}>{ingredient?.name}</p>
                                    </div>
                                    <div className={styles.block}>
                                        <p className={`${styles.span} mr-2`}>
                                        {`${ingredientCounter(ingredient)} x ${ingredient?.price}`}</p>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                    
                                </li>
                            )
                        }) }
                    </ul>
                    
                    <div className={styles.orderInfo}>
                        <p className={styles.orderTime}>{getOrderTime(orderItem.createdAt)}</p>
                        <div className={styles.orderprice}>
                            <p className={styles.price}>{calculateSum()}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
};


export default OrderContentModal;