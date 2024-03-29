import styles from './IngredientDetails.module.css';
import { useSelector } from '../../services/hooks'; 
import { useParams } from 'react-router-dom';
import { FC } from 'react';
import { IIngredient } from '../../services/types/data';


const IngredientDetails: FC = () => {

    const { id } = useParams<{id?: string}>();

    const ingredients = useSelector(state => state.ingredientsReducer.ingredients);  
    const ingredient = ingredients.find((ingredient: IIngredient) => ingredient._id === id);

    return (
        <>
            { ingredient && (
                <div className={styles.content}>
                    <h3 className={`${styles.heading} text text_type_main-large mt-10`}>
                    Детали ингредиента</h3>
                    <img className={styles.image} src={ingredient.image_large} alt='Ингредиент'></img>
                    <p className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</p>
                    <ul className={`${styles.nutritionsInfo} mb-15`}>
                        <li className={styles.nutrition}>
                            <p className='text text_type_main-default text_color_inactive mb-2'>
                            Калории,ккал</p>
                            <p className="text text_type_digits-default text_color_inactive">
                            {ingredient.calories}</p>
                        </li>
                        <li className={styles.nutrition}>
                            <p className='text text_type_main-default text_color_inactive mb-2'>
                            Белки, г</p>
                            <p className="text text_type_digits-default text_color_inactive">
                            {ingredient.proteins}</p>
                        </li>
                        <li className={styles.nutrition}>
                            <p className='text text_type_main-default text_color_inactive mb-2'>
                            Жиры, г</p>
                            <p className="text text_type_digits-default text_color_inactive">
                            {ingredient.fat}</p>
                        </li>
                        <li className={styles.nutrition}>
                            <p className='text text_type_main-default text_color_inactive mb-2'>
                            Углеводы, г</p>
                            <p className="text text_type_digits-default text_color_inactive">
                            {ingredient.carbohydrates}</p>
                        </li>
                    </ul>
                </div>
            )}
        </>
    )
};
        
export default IngredientDetails;