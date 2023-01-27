import styles from './OrderItem.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/hooks';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { getOrderTime, getOrderStatus } from '../../services/constants/constants';
import { FC } from 'react';
import { IOrderItem, IIngredient } from '../../services/types/data';


const OrderItem: FC<IOrderItem> = ({order}) => {
    
    const {status, number, createdAt, name, ingredients, _id} = order;

    const location = useLocation();
    const allIngredients = useSelector((state) => state.ingredientsReducer.ingredients);

    function getSomeIngredient (ingredient: string, allIngredients: IIngredient[]) {
        return allIngredients.find((item: any) => item._id === ingredient)
    };

    const sum = () => {
        let sum = 0;
        ingredients.forEach((ingredient: string) => {
          const orderIngredientItem = getSomeIngredient (ingredient, allIngredients);
          if (orderIngredientItem?.price) {
            sum += orderIngredientItem.price
          }
        })
        return sum;
    };

    let statusDisplay: string | undefined = ''
    if(location.pathname.includes('/profile/orders')) {
        statusDisplay = getOrderStatus(status)
    };

    return (
        <Link to={{
              pathname: `${location.pathname}/${_id}`, 
              state: {background: location} }} 
        className={styles.linkStyles}>
            <div className={`${styles.orderItem} p-6 mb-4`}>
                <div className={styles.orderDetails}>
                    <p className={styles.orderNumber}>{`#${number}`}</p>
                    <p className={styles.orderDate}>{getOrderTime(createdAt)}</p>
                </div>
                <h2 className={`${styles.orderTitle} mt-6 mb-6`}>{name}</h2>

                { statusDisplay === 'Выполнен' ? 
                (<p className={`${styles.orderStatusDone} mb-6`}>{statusDisplay}</p>) 
                : 
                (<p className={`${styles.orderStatus} mb-6`}>{statusDisplay}</p>)
                }
                
                <div className={styles.orderInfo}>
                    <ul className={styles.orderImages}>
                        { ingredients.map((ingredient, index) => {
                            const item = getSomeIngredient(ingredient, allIngredients)
                            if(index < 5) {
                                return (
                                    <li className={styles.listOfIngredients} style={{zIndex: 15 - index}} 
                                    key={index}>
                                        <img src={item?.image_mobile} alt={item?.name}
                                        className={styles.itemImage}></img>
                                    </li>
                                )
                            } else if(index === 6) {
                                return (
                                    <li className={styles.listOfIngredients} style={{zIndex: 15 - index}}
                                    key={index}>
                                        <img src={item?.image_mobile} 
                                        className={`${styles.itemImage} ${styles.restImage}`}
                                        alt={item?.name}></img>
                                        <p className={styles.textRest}>&#43;{ingredients.length - 5}</p>
                                    </li>
                                )
                            }
                        })
                        }
                    </ul>
                    <div className={styles.orderPrice}>
                        <p>{sum()}</p>
                        <CurrencyIcon type={'secondary'}/>
                    </div>
                </div> 
            </div>
        </Link>    
    )
};


export default OrderItem;