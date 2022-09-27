import React from 'react' // импорт библиотеки
import ReactDOM from 'react-dom'
import styles from './AppHedear.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'


function AppHeader() {

    return (
        <div className={styles.header}>

            <nav className={styles.navigation}>
            <a className={styles.buttonConstructor} href="#">
                <BurgerIcon type="primary" />
                <p className="text text_type_main-default">Конструктор</p>
            </a>
            <a className={styles.orderLine} href="#">
                <ListIcon type="secondary" />
                <p className="text text_type_main-default">Лента заказов</p>
            </a>

            </nav>

            <Logo />  
            <a className={styles.account} href="#">
                <ProfileIcon type="secondary" />
                <p className="text text_type_main-default">Личный кабинет</p>
            </a>  
        </div>
    )
  }
 
  
export default AppHeader

  