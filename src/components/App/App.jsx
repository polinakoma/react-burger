import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.js';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.js'
import BurgerConstuctor from '../BurgerConstructor/BurgerConstructor.js'
import IngredientsContext from '../../context/IngredientsContext'
import ConstructorContext from '../../context/ConstructorContext.js'


const initialState = {
  bun: [], 
  ingredients: []
}

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
  }
}


function App() {
  const link = 'https://norma.nomoreparties.space/api/ingredients';

  const [ingredients, setIngredients] = React.useState([]);

  const [constructorState, constructorDispatch] = React.useReducer(reducer, initialState);
 
  const getServerData = () => {
    fetch(link)
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then(json => setIngredients(json.data))
    .catch(error => console.log(`Ошибка загрузки данных - ${error}`))
  };

  React.useEffect(() => {
    getServerData()   
  }, []);


  return (
      <div className={styles.app}>  
        <AppHeader />
        <IngredientsContext.Provider value={ingredients}>
          <ConstructorContext.Provider value={{constructorState, constructorDispatch}} >
            <main className={styles.main}>
              <BurgerIngredients ingredients={ingredients} />
              <BurgerConstuctor ingredients={ingredients} />
            </main>
          </ConstructorContext.Provider> 
        </IngredientsContext.Provider>
      </div>
  );
};


export default App;
