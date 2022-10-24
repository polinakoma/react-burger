import React from 'react';
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import TotalPrice from '../TotalPrice/TotalPrice.js';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import ConstructorContext from '../../context/ConstructorContext.js';


function BurgerConstructor() {

    const url = 'https://norma.nomoreparties.space/api/orders';

    const { constructorState } = React.useContext(ConstructorContext);

    const [modal, setModal] = React.useState(null);
    const [modalData, setModalData] = React.useState(null);
    const [totalPrice, setTotalPrice] = React.useState(null);

    const closeModal = () => {
        setModal(false);
      };
  
    React.useEffect(() => {
        var total = 0

        total = constructorState.bun.price * 2
        setTotalPrice(total)

        constructorState.ingredients.map((item) => {
          total = total + item.price;
          setTotalPrice(total);
        },
        [constructorState.ingredients, setTotalPrice]
        )
    });

      function openOrderModal() {
        setModal(true);

        fetch(url, {
            method: 'POST',
            headers: {
                "Content-type": 'application/json'
              },
            body: JSON.stringify(
                {
                    "ingredients": [
                        constructorState.bun._id,
                        ...constructorState.ingredients.map((ingredient) => ingredient._id),
                        constructorState.bun._id]
                }
            )
        })
        .then(res => {
            if(res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .then(data => {
            setModalData(data);
        });
      };


    return (
        <section className="mt-25">
            <div className={styles.section}>
                <div className={styles.constructor}>
                    <ul className={styles.constructorList}>
                        <div className={styles.bun}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${constructorState.bun.name} (верх)`}
                                price={constructorState.bun.price}
                                thumbnail={constructorState.bun.image_mobile}
                            />
                        </div>
                        <ul className={`${styles.listOfInner} mt-4 mb-4`}>
                            {constructorState.ingredients.map((ingredient) => {
                                if(ingredient.type !== 'bun') {
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
                                }
                            })}
                        </ul>  
                        <div className={styles.bun}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${constructorState.bun.name} (низ)`}
                                price={constructorState.bun.price}
                                thumbnail={constructorState.bun.image_mobile}
                            />
                        </div>
                    </ul>
                </div>
            </div>
            <div className={`${styles.info} mt-10`}>
                <TotalPrice totalPrice={totalPrice}/>
                <Button type="primary" size="medium" htmlType='button' onClick={openOrderModal}>Оформить заказ</Button> 
            </div>

            {modalData && modal &&
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


export default BurgerConstructor