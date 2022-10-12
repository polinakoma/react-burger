import React from 'react' // импорт библиотеки
import  styles from './IngredientCard.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../Modal/Modal.js'
import IngredientDetails from '../IngredientDetails/IngredientDetails.js'
import ingredientPropType from '../../utils/prop-types.js'

function IngredientCard({ingredient}) {

    const [isIngredientDetailsOpen, setIngredientDetailsOpen] = React.useState(false)

    function openIngredientModal() {
          setIngredientDetailsOpen(true);
    }

    const closeIngredientModal = () => {
        setIngredientDetailsOpen(false);
    }
      
    return(
        <>
        <div onClick={openIngredientModal}>
            <Counter size="default" />
            <img src={ingredient.image} alt={ingredient.name}></img>
            <div className={`${styles.price} mt-2 mb-2`}>
                <p className="text text_type_digits-default">{ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${styles.ingredientName} text text_type_main-default`}>{ingredient.name}</p>
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

export default IngredientCard