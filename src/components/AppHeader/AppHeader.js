import styles from './AppHedear.module.css';
import { BurgerIcon,  ListIcon, ProfileIcon, Logo } 
from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';


function AppHeader() {

    return (
        <header className={styles.header}>
            <nav className={styles.navigation}>
            <Link to='/'>
                <button className={`${styles.buttonConstructor} pl-5 pr-5 pb-5 pt-5`} href="#">
                    <BurgerIcon type="primary" />
                    <p className="text text_type_main-default ml-2">Конструктор</p>
                </button>
            </Link>
            <button className={`${styles.orderLine} pl-5 pr-5 pb-5 pt-5 ml-2`} href="#">
                <ListIcon type="secondary" />
                <p className="text text_type_main-default ml-2">Лента заказов</p>
            </button>
            </nav>
            <Logo />  
            <Link to='/profile' className={`${styles.account} pl-5 pr-5 pb-5 pt-5`}>
                <ProfileIcon type="secondary" />
                <p className="text text_type_main-default ml-2">Личный кабинет</p>
            </Link>  
        </header>
    )
};
 
  
export default AppHeader;

  