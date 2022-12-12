import styles from './ConstructorBun.module.css';
import { useSelector } from 'react-redux';
import { pendingImage } from '../../utils/constans.js';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';


function ConstructorBun ({type, position}) {

    const addedIngredients = useSelector(
        (state) => state.constructorIngredientsReducer
    );

    return (
        <div className={styles.bun}>
            <ConstructorElement
                type={type}
                isLocked={true}
                text={addedIngredients.bun ? `${addedIngredients.bun.name} ${position}`
                : 'Выберите булку'}
                price={addedIngredients.bun.price}
                thumbnail={addedIngredients.bun ? 
                addedIngredients.bun.image_mobile : pendingImage}
            />
        </div>
    );
};

ConstructorBun.propTypes = {
    type: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
};


export default ConstructorBun;