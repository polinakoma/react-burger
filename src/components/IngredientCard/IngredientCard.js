import  styles from './IngredientCard.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal.js';
import IngredientDetails from '../IngredientDetails/IngredientDetails.js';
import ingredientPropType from '../../utils/prop-types.js';
import { RESET_INGREDIENT_MODAL, SET_INGREDIENT_MODAL } 
from '../../services/actions/ingredients.js';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useDrag } from "react-dnd";


function IngredientCard({ingredient}) {

    const dispatch = useDispatch();

    const addedIngredients = useSelector(
        (state) => state.constructorIngredientsReducer
    );

    const openIngredientModal = () => {
        dispatch ({
            type: SET_INGREDIENT_MODAL,
            payload: ingredient
        })
    };

    const closeIngredientModal = () => {
        dispatch({
            type: RESET_INGREDIENT_MODAL
        })
    };

    const counter = useMemo(() => {
        if (addedIngredients.bun === null) return 0;
        return ingredient.type === "bun" && ingredient._id === addedIngredients.bun._id
          ? 2
          : addedIngredients.ingredients.filter((item) => item._id === ingredient._id).length;
      }, [addedIngredients.ingredients, addedIngredients.bun, ingredient]
    );

    const [{ opacity }, dragRef] = useDrag({
        type: "ingredient",
        item: ingredient,
        collect: monitor => ({
           opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    const currentIngredient = useSelector(state => state.ingredientInfoReducer.currentIngredient);
    
    
    return(
        <>
            <div onClick={openIngredientModal} ref={dragRef}>
                {counter > 0 && <Counter count={counter} size={"default"} />}
                <img src={ingredient.image} alt={ingredient.name} style={{opacity}}></img>
                <div className={`${styles.price} mt-2 mb-2`}>
                    <p className="text text_type_digits-default">{ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`${styles.ingredientName} text text_type_main-default`}>
                {ingredient.name}</p>
            </div>
            
            {
                currentIngredient &&
                <Modal 
                onClose={closeIngredientModal}
                handleCloseModal={closeIngredientModal}>
                    <IngredientDetails />
                </Modal> 
            }  
        </>  
    )
};

IngredientCard.propTypes = {
    ingredient: ingredientPropType.isRequired
};


export default IngredientCard;