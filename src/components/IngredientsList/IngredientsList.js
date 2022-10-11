import styles from './IngredientsList.module.css'
import IngredientCard from '../IngredientCard/IngredientCard.js'


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
                                name={ingredient.name}
                                price={ingredient.price}
                                image={ingredient.image}
                                image_large={ingredient.image_large} 
                                calories={ingredient.calories}
                                carbohydrates={ingredient.carbohydrates}
                                fat={ingredient.fat} 
                                proteins={ingredient.proteins}
                            />
                        </li>
                    )
                })}
            </ul>
         </>
    )
};


export default IngredientsList