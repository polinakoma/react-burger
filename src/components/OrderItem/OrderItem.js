import styles from './OrderItem.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { creationTime } from '../../utils/constans.js';
import { orderStatus } from '../../utils/constans.js';


export const OrderItem = ({order}) => {
    
    const {status, number, createdAt, name, ingredients, _id} = order;

    const location = useLocation();

    const allIngredients = useSelector((state) => state.ingredientsReducer.ingredients);

    const sum = () => {
        let sum = 0;
        ingredients.forEach((ingredient) => {
          const orderIngredientItem = 
          allIngredients.find((allIngredient) => allIngredient._id === ingredient)
          if (orderIngredientItem?.price) {
            sum += orderIngredientItem.price
          }
        })
        return sum;
    };

    const getSomeIngredient = (ingredient, allIngredients) => {
        return allIngredients.find((item) => item._id === ingredient)
    };

    let statusDisplay = ''
    if(location.pathname.includes('/profile/orders')) {
        statusDisplay = orderStatus(status)
    };


    return (
        <Link to={{
            pathname: `${location.pathname}/${_id}`, 
            state: {background: location} 
        }} className={styles.linkStyles}>
            <div className={`${styles.orderItem} pt-6 pl-6 pr-6 pb-6 mb-4`}>
                <div className={styles.orderDetails}>
                    <p className={styles.orderNumber}>&#35;{number}</p>
                    <p className={styles.orderDate}>{creationTime(createdAt)}</p>
                </div>
                <h2 className={`${styles.orderTitle} mt-6 mb-6`}>{name}</h2>
                <p className={`${styles.orderStatus} mb-6`}>{statusDisplay}</p>
                <div className={styles.orderInfo}>
                    <ul className={styles.orderImages}>
                        { ingredients.map((ingredient, index) => {
                            const item = getSomeIngredient(ingredient, allIngredients)
                            if(index < 5) {
                                return (
                                    <li className={styles.listOfIngredients} style={{zIndex: 15 - index}} 
                                    key={index}>
                                        <img src={item.image_mobile} alt={item.name}
                                        className={styles.itemImage}></img>
                                    </li>
                                )
                            } else if(index === 6) {
                                return (
                                    <li className={styles.listOfIngredients} style={{zIndex: 15 - index}}
                                    key={index}>
                                        <img src={item.image_mobile} 
                                        className={`${styles.itemImage} ${styles.restImage}`}
                                        alt={item.name}></img>
                                        <p className={styles.textRest}>&#43;{ingredients.length - 5}</p>
                                    </li>
                                )
                            }
                        })
                        }
                    </ul>
                    <div className={styles.orderPrice}>
                        <p>{sum()}</p>
                        <CurrencyIcon/>
                    </div>
                </div> 
            </div>
        </Link>    
    )
};

export default OrderItem;