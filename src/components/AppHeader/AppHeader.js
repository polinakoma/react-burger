import styles from './AppHedear.module.css';
import { BurgerIcon,  ListIcon, ProfileIcon, Logo } 
from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';


function AppHeader() {

    return (
        <header className={styles.header}>
            <nav className={styles.navigation}>
                <NavLink to='/'
                activeClassName={styles.link_active}
                className={`${styles.buttonConstructor} pl-5 pr-5 pb-5 pt-5`}>
                    <BurgerIcon type="primary" />
                    <p className="text text_type_main-default ml-2">Конструктор</p>
                </NavLink>
                <NavLink to='/feed'
                activeClassName={styles.link_active}
                className={`${styles.orderLine} pl-5 pr-5 pb-5 pt-5 ml-2`}>
                    <ListIcon type="secondary" />
                    <p className="text text_type_main-default ml-2">Лента заказов</p>
                </NavLink>
                <NavLink to='/'>
                    <Logo />
                </NavLink>
                <NavLink to='/profile' 
                activeClassName={styles.link_active}
                className={`${styles.account} pl-5 pr-5 pb-5 pt-5`}>
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-default ml-2">Личный кабинет</p>
                </NavLink> 
            </nav>  
        </header>
    )
};
 
  
export default AppHeader;

  