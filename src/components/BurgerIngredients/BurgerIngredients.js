import React from 'react' // импорт библиотеки
import ReactDOM from 'react-dom'
import  styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import sauseSpicy from '../../images/spicy_x.svg'
import sauseSpace from '../../images/space_sauce.svg'
import sauseYellow from '../../images/sauce-03.svg'
import sausePink from '../../images/sause_4.svg'
import burgerIngredients from '../utils/data.js'


function BurgerIngredients() {
    const [current, setCurrent] = React.useState('one')

    return (
        <section className={`${styles.section} mr-10`}>
            <h1 className={`${styles.heading} mt-10 mb-5`}>Соберите бургер</h1>

            <div style={{ display: 'flex', marginBottom: '40px' }}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>

            <div className={styles.ingredients}>

                <h2 className="text text_type_main-medium">Булки</h2> 
                <ul className={`${styles.container} mt-6 ml-4 mb-10 mr-2`}>
                    {
                        burgerIngredients.map((ingredient) => {
                            if(ingredient.type === 'bun')
                            return (
                                <div className={styles.item}>
                                    <img src={ingredient.image} alt={ingredient.name}></img>
                                    <div className={`${styles.price} mt-1 mb-1`}>
                                        <p className="text text_type_digits-default">{ingredient.price}</p>
                                        <CurrencyIcon type="primary" />
                                     </div>
                                    <p className="text text_type_main-default" style={{ minHeight: '48px', textAlign: 'center' }}>{ingredient.name}</p>
                                </div>
                            )
                        })
                    }
                </ul>
                <h2 className="text text_type_main-medium">Соусы</h2>
                <ul className={`${styles.container} mt-6 ml-4 mb-10 mr-2`}>
                {
                        burgerIngredients.map((ingredient) => {
                            if(ingredient.type === 'sauce')
                            return (
                                <div className={styles.item}>
                                    <img src={ingredient.image} alt={ingredient.name}></img>
                                    <div className={`${styles.price} mt-1 mb-1`}>
                                        <p className="text text_type_digits-default">{ingredient.price}</p>
                                        <CurrencyIcon type="primary" />
                                     </div>
                                    <p className="text text_type_main-default" style={{ minHeight: '48px', textAlign: 'center' }}>{ingredient.name}</p>
                                </div>
                            )
                        })
                    }
                </ul>
                <h2 className="text text_type_main-medium">Начинки</h2>
                <ul className={`${styles.container} mt-6 ml-4 mb-10 mr-2`}> 
                {
                        burgerIngredients.map((ingredient) => {
                            if(ingredient.type === 'main')
                            return (
                                <div className={styles.item}>
                                    <img src={ingredient.image} alt={ingredient.name}></img>
                                    <div className={`${styles.price} mt-1 mb-1`}>
                                        <p className="text text_type_digits-default">{ingredient.price}</p>
                                        <CurrencyIcon type="primary" />
                                     </div>
                                    <p className="text text_type_main-default" style={{ minHeight: '48px', textAlign: 'center' }}>{ingredient.name}</p>
                                </div>
                            ) 
                        })
                    }
                </ul>
            </div>
        </section>
    )
}

export default BurgerIngredients