import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.js';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.js'
import BurgerConstuctor from '../BurgerConstructor/BurgerConstructor.js'

function App() {
  return (
      <div className={styles.App}>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients 

          />
          <BurgerConstuctor />
        </main>  
      </div>
  );
}


export default App;
