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
        <section className={styles.section}>
            <div className={styles.constructor}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', 
                alignItems: 'flex-end'}}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={20}
                        thumbnail={craterBun}
                    />

                <div className={styles.overlay}>
                    <img src={points} alt='Кнопка'></img>
                    <ConstructorElement
                        text="Соус традиционный галактический"
                        price={30}
                        thumbnail={sauseYellow}
                    />
                </div>

                <div className={styles.overlay}>
                    <img src={points} alt='Кнопка'></img>
                    <ConstructorElement
                        text="Соус традиционный галактический"
                        price={30}
                        thumbnail={sauseYellow}
                    />
                </div>
                
                <div className={styles.overlay}>
                    <img src={points} alt='Кнопка'></img>
                    <ConstructorElement
                        text="Мясо бессмертных моллюсков Protostomia"
                        price={300}
                        thumbnail={meat}
                    />
                </div>
               
                <div className={styles.overlay}>
                    <img src={points} alt='Кнопка'></img>
                    <ConstructorElement
                        text="Плоды Фалленианского дерева"
                        price={80}
                        thumbnail={Fruit}
                    />
                </div>
                
                <div className={styles.overlay}>
                    <img src={points} alt='Кнопка'></img>
                    <ConstructorElement
                        text="Хрустящие минеральные кольца"
                        price={80}
                        thumbnail={mineralRings}
                    />
                </div>
                
                <div className={styles.overlay}>
                    <img src={points} alt='Кнопка'></img>
                    <ConstructorElement
                        text="Хрустящие минеральные кольца"
                        price={80}
                        thumbnail={mineralRings}
                    />
                </div>
                
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={20}
                    thumbnail={craterBun}
                />
                </div>
            </div>

            <div className={styles.info}>
                <div className={styles.priceTotal}>
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