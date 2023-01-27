import React from 'react';
import styles from './IngredientsList.module.css';
import IngredientCard from '../IngredientCard/IngredientCard';
import { useSelector } from '../../services/hooks'; 
import { IIngredient, IIngredientsList } from '../../services/types/data';


const IngredientsList = React.forwardRef<HTMLUListElement, IIngredientsList>( ({title, type}, ref) => {

    const ingredients = useSelector(state => state.ingredientsReducer.ingredients);

    return(
        <>
            <h3 id={type} className="text text_type_main-medium">{title}</h3> 
            <ul className={`${styles.container} mt-6 ml-4 mb-10 mr-2`} ref={ref}>
                {ingredients.map((ingredient: IIngredient) => {
                    if(ingredient.type === type) {
                    return (
                        <li className={styles.item} key={ingredient._id}>
                            <IngredientCard
                                ingredient={ingredient}
                            />
                        </li>
                    )}
                })}
            </ul>
         </>
    )
});

export default IngredientsList;