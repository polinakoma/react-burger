import React from 'react' // импорт библиотеки
import  styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsList from '../IngredientsList/IngredientsList.js'
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux'


const BurgerIngredients = () => {

    const ingredients = useSelector(state => state.ingredientsReducer.ingredients)

    const [current, setCurrent] = React.useState('bun');

    const handleChangeIngredient = (id) => {
        setCurrent(id);
        document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
    };

    const [BunBlockRef, inViewBunBlock] = useInView({threshold: 0});
    const [SauceBlockRef, inViewSauceBlock] = useInView({threshold: 0});
    const [MainBlockRef, inViewMainBlock] = useInView({threshold: 0});
    
    React.useEffect(() => {
        if(inViewBunBlock) {
            setCurrent('bun');
        } else if(inViewSauceBlock) {
            setCurrent('sauce');
        } else if(inViewMainBlock) {
            setCurrent('main');
        }
    }, [inViewBunBlock, inViewSauceBlock, inViewMainBlock]);

    return (
        <section className={`${styles.section} mr-10`}>
            <h1 className={`${styles.heading} text text_type_main-medium mt-10 mb-5`}>
            Соберите бургер</h1>
                <div className={styles.switcher}>
                    <Tab value="bun" active={current === 'bun'} onClick={handleChangeIngredient}>
                        Булки
                    </Tab>
                    <Tab value="sauce" active={current === 'sauce'} onClick={handleChangeIngredient}>
                        Соусы
                    </Tab>
                    <Tab value="main" active={current === 'main'} onClick={handleChangeIngredient}>
                        Начинки
                    </Tab>
                </div>
            <div className={styles.ingredients}>
                <IngredientsList
                    ingredients={ingredients}
                    title={'Булки'}
                    type={'bun'}
                    ref={BunBlockRef}
                />
                <IngredientsList
                    ingredients={ingredients}
                    title={'Соусы'}
                    type={'sauce'}
                    ref={SauceBlockRef}
                />
                <IngredientsList
                    ingredients={ingredients}
                    title={'Начинки'}
                    type={'main'}
                    ref={MainBlockRef}
                />
            </div>
        </section>
    )
};


export default BurgerIngredients;