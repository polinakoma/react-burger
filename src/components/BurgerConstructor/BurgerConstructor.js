import React from 'react' // импорт библиотеки
import ReactDOM from 'react-dom'
import styles from './BurgerConstructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import craterBun from '../../images/crater_bun.svg'
import meat from '../../images//meat-02.svg'
import mineralRings from '../../images/mineral_rings.svg'
import Fruit from '../../images/plody.svg'
import sauseYellow from '../../images/sauce-03.svg'
import points from '../../images/points.svg'
import money from '../../images/Subtract.svg'


function BurgerConstructor() {
    return (
        <section className="mt-25 pl-4">
            <div className={styles.constructor}>
                <div style={{ display: 'flex', flexDirection: 'column',  
                alignItems: 'flex-end', marginRight: '8px'}}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={20}
                        thumbnail={craterBun}
                    />
    
                    <ul className={`${styles.list} mt-4`}>
                        <li className={`${styles.overlay} mb-4`}>
                            <img src={points} alt='Кнопка' style={{ marginRight: '8px' }}></img>
                            <ConstructorElement
                                text="Соус традиционный галактический"
                                price={30}
                                thumbnail={sauseYellow}
                            />
                        </li>

                        <li className={`${styles.overlay} mb-4`}>
                            <img src={points} alt='Кнопка' style={{ marginRight: '8px' }}></img>
                            <ConstructorElement
                                text="Соус традиционный галактический"
                                price={30}
                                thumbnail={sauseYellow}
                            />
                        </li>
                    
                        <li className={`${styles.overlay} mb-4`}>
                            <img src={points} alt='#' style={{ marginRight: '8px' }}></img>
                            <ConstructorElement
                                text="Мясо бессмертных моллюсков Protostomia"
                                price={300}
                                thumbnail={meat}
                            />
                        </li>
                        <li className={`${styles.overlay} mb-4`}>
                            <img src={points} alt='#' style={{ marginRight: '8px' }}></img>
                            <ConstructorElement
                                text="Плоды Фалленианского дерева"
                                price={80}
                                thumbnail={Fruit}
                            />
                        </li>
                        <li className={`${styles.overlay} mb-4`}>
                            <img src={points} alt='#' style={{ marginRight: '8px' }}></img>
                            <ConstructorElement
                                text="Хрустящие минеральные кольца"
                                price={80}
                                thumbnail={mineralRings}
                            />
                        </li>
                        <li className={`${styles.overlay} mb-4`}    >
                            <img src={points} alt='#' style={{ marginRight: '8px' }}></img>
                            <ConstructorElement
                                text="Хрустящие минеральные кольца"
                                price={80}
                                thumbnail={mineralRings}
                            />
                        </li>
                    </ul>              
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={20}
                        thumbnail={craterBun}
                    />
                </div>
            </div>

            <div className={`${styles.info} mt-10`}>
                <div className={`${styles.priceTotal} mr-10`}>
                    <p className="text text_type_digits-medium">610</p>
                    <img src={money} alt='Субстракт'></img>
                </div>
                <button className={styles.button}>
                <p className="text text_type_main-default">Оформить заказ</p>
                </button>
            </div>
            
            
        </section>

    )
}

export default BurgerConstructor