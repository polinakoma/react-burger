import styles from './OrderDetails.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import overlayFirst from '../../images/Vector 1.svg';
import overlaySecond from '../../images/Vector 2.svg';
import overlayThird from '../../images/Vector 3.svg';
import { useSelector } from 'react-redux';


function OrderDetails() {

    const orderNumber = useSelector((state) => state.orderReducer.orderNumber);

    return(
        <div className={styles.content}>
            <h3 className="text text_type_digits-large mt-30 mb-8">{orderNumber.number}</h3>
            <p className="text text_type_main-medium mb-30">идентификатор заказа</p>
            <div className={styles.checkMark}>
                <CheckMarkIcon type="primary" />
            </div>
            <img src={overlayFirst} className={styles.overlayFirst} alt=''></img>
            <img src={overlaySecond} className={styles.overlaySecond} alt=''></img>
            <img src={overlayThird} className={styles.overlayThird} alt=''></img>
            <p className="text text_type_main-default pt-30 mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mb-30">
            Дождитесь готовности на орбитальной станции</p>
        </div>
    )
};

export default OrderDetails;

