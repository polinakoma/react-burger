import React from 'react' // импорт библиотеки
import ReactDOM from 'react-dom'
import  styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import craterBun from '../../images/crater_bun.svg'
import fluorescentBun from '../../images/fluorescent_bun.svg'
import sauseSpicy from '../../images/spicy_x.svg'
import sauseSpace from '../../images/space_sauce.svg'
import sauseYellow from '../../images/sauce-03.svg'
import sausePink from '../../images/sause_4.svg'


function BurgerIngredients() {
    const [current, setCurrent] = React.useState('one')

    return (
        <section className={styles.section}>
            <h1 className={styles.heading}>Соберите бургер</h1>

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
                {/* <Counter count={1} size="default" /> */}
                <div className={styles.container}>
                    <div className={styles.item}>
                        <img src={craterBun} alt='Краторная булка N-200i'></img>
                        <div className={styles.price}>
                            <p className="text text_type_digits-default">20</p>
                            <CurrencyIcon type="primary" />
                        </div>
                        <p className="text text_type_main-default">Краторная булка N-200i</p>
                    </div>

                    <div className={styles.item}>
                        <img src={fluorescentBun} alt='Флюоресцентная булка R2-D3'></img>
                        <div className={styles.price}>
                            <p className="text text_type_digits-default">20</p>
                            <CurrencyIcon type="primary" />
                        </div>
                        <p className="text text_type_main-default">Флюоресцентная булка R2-D3</p>
                    </div>
                </div>

                <h2 className="text text_type_main-medium">Соусы</h2>
                <div className={styles.container}>
                    <div className={styles.item}>
                        <img src={sauseSpicy} alt='Соус Spicy-X'></img>
                        <div className={styles.price}>
                            <p className="text text_type_digits-default">30</p>
                            <CurrencyIcon type="primary" />
                        </div>
                        <p className="text text_type_main-default">Соус Spicy-X</p>
                    </div>

                    <div className={styles.item}>
                        <img src={sauseSpace} alt='Соус фирменный Space Sauce'></img>
                        <div className={styles.price}>
                            <p className="text text_type_digits-default">30</p>
                            <CurrencyIcon type="primary" />
                        </div>
                        <p className="text text_type_main-default">Соус фирменный Space Sauce</p>
                    </div>

                    <div className={styles.item}>
                        <img src={sauseYellow} alt='Флюоресцентная булка R2-D3'></img>
                    </div>

                    <div className={styles.item}>
                        <img src={sausePink} alt='Флюоресцентная булка R2-D3'></img>
                    </div>
                    {/* <Counter count={1} size="default" /> */}
                </div>

            </div>
            



        </section>
    )
}

export default BurgerIngredients