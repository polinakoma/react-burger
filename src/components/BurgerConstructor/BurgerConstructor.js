import React from 'react';
import { useMemo } from 'react';
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, Button } 
from '@ya.praktikum/react-developer-burger-ui-components';
import TotalPrice from '../TotalPrice/TotalPrice.js';
import Modal from '../Modal/Modal.js';
import OrderDetails from '../OrderDetails/OrderDetails.js';
import { pendingImage } from '../../utils/constans.js';
import { useSelector } from 'react-redux'
import { bindActionCreators } from 'redux';
import store from '../../services';
import * as actions from '../../services/actions/ingredients.js';
import { useDrop } from "react-dnd";
import { CONSTRUCTOR_RESET, ADD_INGREDIENT_TO_CONSTRUCTOR} 
from '../../services/actions/ingredients.js';
import { v4 as uuidv4 } from 'uuid';
import ConstructorCard from '../ConstructorCard/ConstructorCard.js';


function BurgerConstructor() {

    const [modalData, setModalData] = React.useState(null);

    const { dispatch } = store;
    const { getOrderNumber } = bindActionCreators(actions, dispatch);
    
    const addedIngredients = useSelector(
        (state) => state.constructorIngredientsReducer
    );

    const ingredients = useMemo(() => addedIngredients.ingredients.filter(
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
        getOrderNumber(data);
        setModalData(true);

        dispatch({
            type: CONSTRUCTOR_RESET,
            payload: addedIngredients
        });
    };

    const [{isHover}, dropTarget] = useDrop({
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
                        <div className={styles.bun}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={addedIngredients.bun.name ? `${addedIngredients.bun.name} (верх)` 
                                : 'Выберите булку'}
                                price={addedIngredients.bun.price}
                                thumbnail={addedIngredients.bun.image_mobile ? 
                                addedIngredients.bun.image_mobile : pendingImage}
                                />
                        </div>
                        <ul className={`${styles.listOfInner} mt-4 mb-4`} >
                            {ingredients.map((ingredient, index) => {
                                return (
                                    <ConstructorCard 
                                    key={ingredient.key} 
                                    ingredient={ingredient}
                                    index={index}
                                    />
                                )
                            })}
                        </ul> 
                        <div className={styles.bun}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={addedIngredients.bun.name ? `${addedIngredients.bun.name} (низ)` 
                                : 'Выберите булку'}
                                price={addedIngredients.bun.price}
                                thumbnail={addedIngredients.bun.image_mobile ? 
                                addedIngredients.bun.image_mobile : pendingImage}
                            />
                        </div>
                    </ul>
                </div>
            </div>
            <div className={`${styles.info} mt-10`}>
                <TotalPrice 
                totalPrice={price} 
                />
                <Button type="primary" size="medium" htmlType='button' 
                onClick={openOrderModal}
                >Оформить заказ</Button> 
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