import React from 'react' // импорт библиотеки
import  styles from './IngredientCard.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../Modal/Modal.js'
import IngredientDetails from '../IngredientDetails/IngredientDetails.js'

function IngredientCard({ name, price, image, calories, proteins, fat, image_large, carbohydrates}) {

    const [isIngredientDetailsOpen, setIngredientDetailsOpen] = React.useState(false)

    function openIngredientModal() {
          setIngredientDetailsOpen(true);
    }

    const closeIngredientModal = () => {
        setIngredientDetailsOpen(false);
    }

    const handleCloseModalByEsc = (evt) => {
        evt.key === "Escape" && closeIngredientModal();
    }
      
    return(
        <>
        <div onClick={openIngredientModal}>
            <Counter size="default" />
            <img src={image} alt={name}></img>
            <div className={`${styles.price} mt-2 mb-2`}>
                <p className="text text_type_digits-default">{price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${styles.ingredientName} text text_type_main-default`}>{name}</p>
        </div>
        
        {isIngredientDetailsOpen &&
            <Modal 
              onOverlayClick={closeIngredientModal}
              onEscKeydown={handleCloseModalByEsc}>
            <IngredientDetails      
                image_large={image_large} 
                name={name}
                calories={calories}
                carbohydrates={carbohydrates}
                fat={fat} 
                proteins={proteins}
                handleCloseIngredientModal={closeIngredientModal}
            />
            </Modal> 
        }  
        </>  
    )
};

export default IngredientCard