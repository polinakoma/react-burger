import styles from './TotalPrice.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const TotalPrice = ({totalPrice}) => {

    return (
        <div className={`${styles.priceTotal} mr-10`}>
            <p className="text text_type_digits-medium">{totalPrice || 0}</p>
            <div className={styles.currencyIcon}>
                <CurrencyIcon type="primary" />
            </div>
        </div>
    )
};

TotalPrice.propTypes = {
    totalPrice: PropTypes.number.isRequired
};


export default TotalPrice;