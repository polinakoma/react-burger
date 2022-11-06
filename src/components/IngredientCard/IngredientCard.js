import React from 'react' // импорт библиотеки
import  styles from './IngredientCard.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal.js';
import IngredientDetails from '../IngredientDetails/IngredientDetails.js';
import ingredientPropType from '../../utils/prop-types.js';
import { useDispatch } from 'react-redux';
import {RESET_INGREDIENT_MODAL, SET_INGREDIENT_MODAL, 
ADD_INGREDIENT_TO_CONSTRUCTOR} from '../../services/actions/ingredients.js'


function IngredientCard({ingredient}) {

    const dispatch = useDispatch();

    const [isIngredientDetailsOpen, setIngredientDetailsOpen] = React.useState(false);

    const openIngredientModal = (ingredient) => {
        setIngredientDetailsOpen(true);
        dispatch ({
            type: SET_INGREDIENT_MODAL,
            payload: ingredient
        })
        dispatch ({
            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
            payload: ingredient
        })
    };

    const closeIngredientModal = () => {
        setIngredientDetailsOpen(false);
        dispatch({
            type: RESET_INGREDIENT_MODAL
        })
    };

      
    return(
        <>
            <div onClick={openIngredientModal}>
                <Counter size="default" />
                <img src={ingredient.image} alt={ingredient.name}></img>
                <div className={`${styles.price} mt-2 mb-2`}>
                    <p className="text text_type_digits-default">{ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`${styles.ingredientName} text text_type_main-default`}>
                {ingredient.name}</p>
            </div>
            
            {isIngredientDetailsOpen &&
                <Modal 
                onClose={closeIngredientModal}
                handleCloseModal={closeIngredientModal}>
                    <IngredientDetails      
                        ingredient={ingredient}
                    />
                </Modal> 
            }  
        </>  
    )
};

IngredientCard.propTypes = {
    ingredient: ingredientPropType.isRequired
};


export default IngredientCard;