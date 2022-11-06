import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.js';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.js';
import BurgerConstuctor from '../BurgerConstructor/BurgerConstructor.js';
import ConstructorContext from '../../context/ConstructorContext.js';
import { bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import store from '../../services/index.js';
import * as actions from '../../services/actions/ingredients.js'


const { dispatch } = store;
const { getIngredientsData } = bindActionCreators(actions, dispatch);

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
    }
};

function App() {

    const [constructorState, constructorDispatch] = React.useReducer(reducer, initialState);
    
    React.useEffect(() => {
       getIngredientsData(); 
    }, []);

    return (
        <Provider store={store}>
        <div className={styles.app}>  
            <AppHeader />
            <ConstructorContext.Provider value={{constructorState, constructorDispatch}} >
                <main className={styles.main}>
                    <BurgerIngredients />
                    <BurgerConstuctor />
                </main>
            </ConstructorContext.Provider> 
        </div>

        </Provider>
    )
};


export default App;
