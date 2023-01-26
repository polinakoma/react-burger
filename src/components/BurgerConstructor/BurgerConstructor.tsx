import styles from './BurgerConstructor.module.css';
import TotalPrice from '../TotalPrice/TotalPrice';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import ConstructorFilling from '../ConstructorFilling/ConstructorFilling';
import ConstructorBun from '../ConstructorBun/ConstructorBun';
import { FC, useState, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/hooks'
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import { ADD_INGREDIENT_TO_CONSTRUCTOR } from '../../services/actions/ingredients';
import { getOrderNumber } from '../../services/actions/ingredients'
import { getCookie } from '../../utils/cookie';
import { useHistory } from 'react-router-dom';
import { IIngredient } from '../../services/types/data';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';


const BurgerConstructor: FC = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const accessToken = getCookie('accessToken')

    const [modalData, setModalData] = useState<number>();

    const closeModal = () => {  
        setModalData(undefined);
    };

    const userInfo = useSelector((state) => state.userRequestReducer.userInfo)

    const addedIngredients = useSelector(
        (state) => state.constructorIngredientsReducer
    );

    const fillings = useMemo<IIngredient[]>(() => addedIngredients.ingredients.filter(
        (ingredient: IIngredient) => ingredient.type !== 'bun'), 
        [addedIngredients.ingredients]
    );

    const price = useMemo<number>(() => {
        return (
            (addedIngredients.bun ? addedIngredients.bun.price * 2 : 0) +
            addedIngredients.ingredients.reduce((a, b) => a + b.price, 0)
        );
    }, [addedIngredients]);

    const data = addedIngredients.bun ? {
        ingredients: [
            addedIngredients.bun._id,
            ...addedIngredients.ingredients.map((ingredient: IIngredient) => ingredient._id),
            addedIngredients.bun._id
        ]  
    } : undefined;

    function openOrderModal() {
        if(!userInfo) {
            history.push('/login')
        } else {
        dispatch(getOrderNumber(data, setModalData, accessToken))
        } 
    };

    

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item: IIngredient) {
            dispatch ({
                type: ADD_INGREDIENT_TO_CONSTRUCTOR,
                payload: { ...item, key: uuidv4()}
            }) 
        },
    });
    
    return (
        <section className="mt-25" ref={dropTarget}>
            <div className={styles.section}>
                <div className={styles.constructorBox}>
                    <ul className={styles.constructorList}>
                        <ConstructorBun 
                            type='top'
                            position='(верх)'
                        />
                        <ul className={`${styles.listOfInner} mt-4 mb-4`} >
                            {fillings.map((ingredient: IIngredient, index: number) => {
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