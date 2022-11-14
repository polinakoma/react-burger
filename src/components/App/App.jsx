import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.js';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.js';
import BurgerConstuctor from '../BurgerConstructor/BurgerConstructor.js';
import { Provider } from 'react-redux';
import store from '../../services/index.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredientsData } from '../../services/actions/ingredients.js';


function App() {

    const { dispatch } = store;

    React.useEffect(() => {
        dispatch(getIngredientsData()); 
    }, []);


    return (
        <Provider store={store}>
            <div className={styles.app}>  
                <AppHeader />
                <main className={styles.main}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients />
                        <BurgerConstuctor />
                    </DndProvider>
                </main>
            </div>
        </Provider>
    )
};


export default App;
