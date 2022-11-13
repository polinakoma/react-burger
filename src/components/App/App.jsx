import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.js';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.js';
import BurgerConstuctor from '../BurgerConstructor/BurgerConstructor.js';
import { bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import store from '../../services/index.js';
import * as actions from '../../services/actions/ingredients.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";


function App() {

    const { dispatch } = store;
    const { getIngredientsData } = bindActionCreators(actions, dispatch);

    React.useEffect(() => {
       getIngredientsData(); 
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
