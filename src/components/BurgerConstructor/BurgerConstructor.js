import React from 'react';
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, Button, DragIcon } 
from '@ya.praktikum/react-developer-burger-ui-components';
import TotalPrice from '../TotalPrice/TotalPrice.js';
import Modal from '../Modal/Modal.js';
import OrderDetails from '../OrderDetails/OrderDetails.js';
import ConstructorContext from '../../context/ConstructorContext.js';
import { sendIngredients } from '../../utils/burger-api.js';
import { pendingImage } from '../../utils/constans.js';


function BurgerConstructor() {

    const { constructorState } = React.useContext(ConstructorContext);

    const [modal, setModal] = React.useState(null);
    const [modalData, setModalData] = React.useState(null);

    const closeModal = () => {
        setModal(false);
        setModalData(null);
    };

    const price = React.useMemo(() => {
        return (
            (constructorState.bun ? constructorState.bun.price * 2 : 0) +
            constructorState.ingredients.reduce((a, b) => a + b.price, 0)
        );
    }, [constructorState]);

    const data = {
        "ingredients": [
            constructorState.bun._id,
            ...constructorState.ingredients.map((ingredient) => ingredient._id),
            constructorState.bun._id]
    };

    function openOrderModal() {
        setModal(true);
        sendIngredients(data, setModalData);
    };

    const ingredients = React.useMemo(() => constructorState.ingredients.filter(
    (ingredient) => ingredient.type !== 'bun'), [constructorState.ingredients]);
    

    return (
        <section className="mt-25">
            <div className={styles.section}>
                <div className={styles.constructor}>
                    <ul className={styles.constructorList}>
                        <div className={styles.bun}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={constructorState.bun.name ? `${constructorState.bun.name} (верх)` 
                                : 'Выберите булку'}
                                price={constructorState.bun.price}
                                thumbnail={constructorState.bun.image_mobile ? 
                                constructorState.bun.image_mobile : pendingImage}
                            />
                        </div>
                        <ul className={`${styles.listOfInner} mt-4 mb-4`}>
                            {ingredients.map((ingredient) => {
                                return (
                                    <li className={`${styles.overlay} mb-4`} key={ingredient._id}>
                                        <div className={styles.points}>
                                            <DragIcon type="primary" />
                                        </div>                                        
                                        <ConstructorElement
                                            text={ingredient.name}
                                            price={ingredient.price}
                                            thumbnail={ingredient.image_mobile}
                                        />
                                    </li>
                                )
                            })}
                        </ul>  
                        <div className={styles.bun}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={constructorState.bun.name ? `${constructorState.bun.name} (низ)` 
                                : 'Выберите булку'}
                                price={constructorState.bun.price}
                                thumbnail={constructorState.bun.image_mobile ? 
                                constructorState.bun.image_mobile : pendingImage}
                            />
                        </div>
                    </ul>
                </div>
            </div>
            <div className={`${styles.info} mt-10`}>
                <TotalPrice totalPrice={price}/>
                <Button type="primary" size="medium" htmlType='button' 
                onClick={openOrderModal}>Оформить заказ</Button> 
            </div>

            {modalData && 
                <Modal 
                    onClose={closeModal}
                    handleCloseModal={closeModal}>
                    <OrderDetails 
                    orderNumber={modalData.order.number} />
                </Modal> 
            }  
        </section> 
    )
};


export default BurgerConstructor;