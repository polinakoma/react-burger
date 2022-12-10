import React from 'react';
import { useMemo } from 'react';
import styles from './BurgerConstructor.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import TotalPrice from '../TotalPrice/TotalPrice.js';
import Modal from '../Modal/Modal.js';
import OrderDetails from '../OrderDetails/OrderDetails.js';
import { useSelector, useDispatch } from 'react-redux'
import { useDrop } from "react-dnd";
import { ADD_INGREDIENT_TO_CONSTRUCTOR } 
from '../../services/actions/ingredients.js';
import { v4 as uuidv4 } from 'uuid';
import ConstructorFilling from '../ConstructorFilling/ConstructorFilling.js';
import ConstructorBun from '../ConstructorBun/ConstructorBun.js';
import { getOrderNumber } from '../../services/actions/ingredients.js'


function BurgerConstructor() {

    const [modalData, setModalData] = React.useState(null);

    const dispatch = useDispatch();
    
    const addedIngredients = useSelector(
        (state) => state.constructorIngredientsReducer
    );

    const fillings = useMemo(() => addedIngredients.ingredients.filter(
        (ingredient) => ingredient.type !== 'bun'), [addedIngredients.ingredients]);


    const closeModal = () => {  
        setModalData(null);
    };

    const price = useMemo(() => {
        return (
            (addedIngredients.bun ? addedIngredients.bun.price * 2 : 0) +
            addedIngredients.ingredients.reduce((a, b) => a + b.price, 0)
        );
    }, [addedIngredients]);

    const data = {
        "ingredients": [
            addedIngredients.bun._id,
            ...addedIngredients.ingredients.map((ingredient) => ingredient._id),
            addedIngredients.bun._id
        ]
    };

    function openOrderModal() {
        dispatch(getOrderNumber(data, setModalData)) 
    };

    

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item) {
            dispatch ({
                type: ADD_INGREDIENT_TO_CONSTRUCTOR,
                payload: { ...item, key: uuidv4()}
            }) 
        },
    });
    

    return (
        <section className="mt-25" ref={dropTarget}>
            <div className={styles.section} >
                <div className={styles.constructor}>
                    <ul className={styles.constructorList}>
                        <ConstructorBun 
                            type='top'
                            position='(верх)'
                        />
                        <ul className={`${styles.listOfInner} mt-4 mb-4`} >
                            {fillings.map((ingredient, index) => {
                                return (
                                    <ConstructorFilling 
                                    key={ingredient.key} 
                                    ingredient={ingredient}
                                    index={index}
                                    />
                                )
                            })}
                        </ul> 
                        <ConstructorBun 
                            type='bottom'
                            position='(низ)'
                        />
                    </ul>
                </div>
            </div>
            <div className={`${styles.info} mt-10`}>
                <TotalPrice totalPrice={price} /> 
                <Button
                    type="primary"
                    size="medium"
                    htmlType='button'
                    onClick={openOrderModal}
                    disabled= {!addedIngredients.bun}>Оформить заказ
                </Button> 
            </div>

            {modalData && 
                <Modal 
                    onClose={closeModal}
                    handleCloseModal={closeModal}>
                    <OrderDetails/>
                </Modal> 
            } 
        </section> 
    )
};


export default BurgerConstructor;