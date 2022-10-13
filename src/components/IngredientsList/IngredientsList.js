import styles from './IngredientsList.module.css'
import IngredientCard from '../IngredientCard/IngredientCard.js'
import PropTypes from 'prop-types';
import ingredientPropType from '../../utils/prop-types.js'


function IngredientsList({ingredients, title, type}) {

    return(
        <>
            <h3 id={type} className="text text_type_main-medium">{title}</h3> 
            <ul className={`${styles.container} mt-6 ml-4 mb-10 mr-2`}>
                {ingredients.map((ingredient) => {
                    if(ingredient.type === type)
                    return (
                        <li className={styles.item} key={ingredient._id}>
                            <IngredientCard
                                ingredient={ingredient}
                            />
                        </li>
                    )
                })}
            </ul>
         </>
    )
};

IngredientsList.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};


export default IngredientsList