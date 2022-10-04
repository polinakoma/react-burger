import React from 'react';
import styles from './App.module.css';
import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients.js'
import BurgerConstuctor from './components/BurgerConstructor/BurgerConstructor.js'

function App() {
  document.body.style.backgroundColor = "#E5E5E5";
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
