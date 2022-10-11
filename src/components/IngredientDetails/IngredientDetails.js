import styles from './IngredientDetails.module.css'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'


function IngredientDetails({ image_large, name, calories, carbohydrates, fat, proteins, handleCloseIngredientModal}) {

    return (
        <div className={styles.content}>
            <h3 className={`${styles.heading} text text_type_main-large mt-10 ml-10`}>Детали ингредиента</h3>
            <img className={styles.image} src={image_large}></img>
            <p className="text text_type_main-medium mt-4 mb-8">{name}</p>
            <ul className={`${styles.nutritionsInfo} mb-15`}>
                <li className={styles.nutrition}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>Калории,ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{calories}</p>
                </li>
                <li className={styles.nutrition}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{proteins}</p>
                </li>
                <li className={styles.nutrition}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{fat}</p>
                </li>
                <li className={styles.nutrition}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{carbohydrates}</p>
                </li>
            </ul>
            <div className={styles.closeIcon} > 
                <CloseIcon type="primary" onClick={handleCloseIngredientModal} />
            </div>
        </div>
    )
};

        
export default IngredientDetails