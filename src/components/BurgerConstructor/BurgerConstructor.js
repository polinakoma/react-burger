import React from 'react' // импорт библиотеки
import ReactDOM from 'react-dom'
import styles from './BurgerConstructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredients from '../utils/data.js'
import PropTypes from 'prop-types';


import craterBun from '../../images/crater_bun.svg'
import meat from '../../images//meat-02.svg'
import mineralRings from '../../images/mineral_rings.svg'
import Fruit from '../../images/plody.svg'
import sauseYellow from '../../images/sauce-03.svg'
import points from '../../images/points.svg'
import money from '../../images/Subtract.svg'


function BurgerConstructor(props) {
    burgerIngredients.propTypes = {
        _id: PropTypes.any,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number.isRequired,
        image: PropTypes.any.isRequired,
        image_mobile: PropTypes.any,
        image_large: PropTypes.any,
        __v: PropTypes.number
    }

    return (
        <section className="mt-25">
            <div className={styles.constructor}>
                <div style={{ display: 'flex', flexDirection: 'column',  
                alignItems: 'flex-end'}} >
                    <ul className={styles.constructorList}>
                    <img src={points} alt='Кнопка' style={{ marginRight: '8px', opacity: '0' }}></img>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text="Краторная булка N-200i (верх)"
                            price={20}
                            thumbnail={craterBun}
                        />
        
                        <ul className={`${styles.listOfInner} mt-4 mb-4`}>
                            {
                                burgerIngredients.map((ingredient) => {
                                    if(ingredient.type !== 'bun') {
                                        return (
                                            <li className={`${styles.overlay} mb-4`}>
                                                <img src={points} alt='Кнопка' style={{ marginRight: '8px' }}></img>
                                                <ConstructorElement
                                                    text={ingredient.name}
                                                    price={ingredient.price}
                                                    thumbnail={ingredient.image_mobile}
                                                />
                                            </li>
                                        )
                                    }
                                })
                                }
                        </ul>  
                        <img src={points} alt='Кнопка' style={{ marginRight: '8px', opacity: '0' }}></img>            
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text="Краторная булка N-200i (низ)"
                            price={20}
                            thumbnail={craterBun}
                        />
                    </ul>
                </div>
            </div>

            <div className={`${styles.info} mt-10`}>
                <div className={`${styles.priceTotal} mr-10`}>
                    <p className="text text_type_digits-medium">610</p>
                    <img src={money} alt='Субстракт'></img>
                </div>
                <Button type="primary" size="medium">Оформить заказ</Button>
            </div> 
        </section>

    )
}

export default BurgerConstructor