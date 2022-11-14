import styles from './ConstructorBun.module.css';
import { useSelector } from 'react-redux';
import { pendingImage } from '../../utils/constans.js';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';


function ConstructorBun ({type, position}) {

    const addedIngredients = useSelector(
        (state) => state.constructorIngredientsReducer
    );

    return (
        <div className={styles.bun}>
            <ConstructorElement
                type={type}
                isLocked={true}
                text={addedIngredients.bun.name ? `${addedIngredients.bun.name} ${position}`
                : 'Выберите булку'}
                price={addedIngredients.bun.price}
                thumbnail={addedIngredients.bun.image_mobile ? 
                addedIngredients.bun.image_mobile : pendingImage}
            />
        </div>
    );
};


export default ConstructorBun;