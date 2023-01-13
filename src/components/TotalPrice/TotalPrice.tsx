import styles from './TotalPrice.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { FC } from 'react';
import { ITotalPriceProps } from '../../services/types/data';


const TotalPrice: FC<ITotalPriceProps> = ({totalPrice}) => {

    return (
        <div className={`${styles.priceTotal} mr-10`}>
            <p className="text text_type_digits-medium">{totalPrice || 0}</p>
            <div className={styles.currencyIcon}>
                <CurrencyIcon type="primary" />
            </div>
        </div>
    )
};


export default TotalPrice;