import styles from './BurgerConstructor.module.css';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import craterBun from '../../images/crater_bun.svg'
import ingredientPropType from '../../utils/prop-types.js'


function BurgerConstructor({ingredients, handleOpenModal}) {

    return (
        <section className="mt-25">
            <div className={styles.section}>
                <div className={styles.constructor}>
                    <ul className={styles.constructorList}>

                        <div className={styles.bun}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text="Краторная булка N-200i (верх)"
                                price={20}
                                thumbnail={craterBun}
                            />
                        </div>
                        <ul className={`${styles.listOfInner} mt-4 mb-4`}>
                            {ingredients.map((ingredient) => {
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
                                text="Краторная булка N-200i (низ)"
                                price={20}
                                thumbnail={craterBun}
                            />
                        </div>
                        
                    </ul>
                </div>
            </div>

            <div className={`${styles.info} mt-10`}>
                <div className={`${styles.priceTotal} mr-10`}>
                    <p className="text text_type_digits-medium">610</p>
                    <div className={styles.currencyIcon}>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
                <Button type="primary" size="medium" htmlType='button' onClick={handleOpenModal}>Оформить заказ</Button>
            </div> 
        </section>
    )
};

export default BurgerConstructor