import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.js';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.js';
import BurgerConstuctor from '../BurgerConstructor/BurgerConstructor.js';
import IngredientsContext from '../../context/IngredientsContext.js';
import ConstructorContext from '../../context/ConstructorContext.js';
import { getIngredients } from '../../utils/burger-api.js';


const initialState = {
    bun: [], 
    ingredients: []
};

function reducer(state, action) {
    switch (action.type) {
        case "add":
            if(action.payload.type === 'bun') {
            return {
                ...state,
                bun: action.payload,
            };
        }
        return {
            ...state,
            ingredients: [...state.ingredients, action.payload]
        } 
        default:
            return {...state}
    };
};


function App() {
    const [ingredients, setIngredients] = React.useState([]);

    const [constructorState, constructorDispatch] = React.useReducer(reducer, initialState);
 
    React.useEffect(() => {
        getIngredients(setIngredients)  
    }, []);


    return (
        <div className={styles.app}>  
            <AppHeader />
            <IngredientsContext.Provider value={ingredients}>
                <ConstructorContext.Provider value={{constructorState, constructorDispatch}} >
                    <main className={styles.main}>
                        <BurgerIngredients />
                        <BurgerConstuctor />
                    </main>
            </ConstructorContext.Provider> 
            </IngredientsContext.Provider>
        </div>
    )
};


export default App;
