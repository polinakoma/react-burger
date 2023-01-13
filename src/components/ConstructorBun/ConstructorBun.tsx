import styles from './ConstructorBun.module.css';
import { useSelector } from '../../services/hooks'; 
import { PENDING_IMAGE } from '../../services/constants/constants';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { FC } from 'react';
import { IConstructorBunProps } from '../../services/types/data';


const ConstructorBun: FC<IConstructorBunProps> =  ({type, position}) => {

    const addedIngredients = useSelector(
        (state) => state.constructorIngredientsReducer
    );

    return (
        <div className={styles.bun}>
            <ConstructorElement
                text={addedIngredients.bun ? `${addedIngredients.bun.name} ${position}`
                : 'Выберите булку'}
                price={addedIngredients.bun?.price}
                type={type}
                isLocked={true}
                thumbnail={addedIngredients.bun ? 
                addedIngredients.bun.image_mobile : PENDING_IMAGE}
            />
        </div>
    );
};


export default ConstructorBun;