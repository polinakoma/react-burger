import styles from './OrderContentModal.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import bun from '../../images/bun1.svg';
import { useParams } from 'react-router-dom';


export const OrderContentModal = () => {

    const { id } = useParams();

    // достать из стора то, что отрисовывать
    // взять методом файнд и перебрать все, отрисовать в разметку

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <p className={`${styles.orderNumber} mb-10`}>#034533</p>
                <h1 className={`${styles.orderTitle} mb-3`}>Black Hole Singularity острый бургер</h1>
                <p className={`${styles.orderStatus} mb-15`}>Выполнен</p>
                <p className={`${styles.orderContent} mb-6`}>Состав:</p>

                <div className={styles.ingredientArea}>
                    <div className={`${styles.orderIngredient} mb-10`}>
                        <img src={bun} alt='ингредиент'></img>
                        <p className={`${styles.orderIngredientTitle} mr-4 ml-4`}>Флюоресцентная булка R2-D3</p>
                        <p className='mr-2'> 2 х 20</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
                
                <div className={styles.orderInfo}>
                    <p className={styles.orderTime}>Вчера, 13:50 i-GMT+3</p>
                    <div className={styles.orderInfo}>
                        <p className={styles.price}>510</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </main>
        

    )
}


export default OrderContentModal;