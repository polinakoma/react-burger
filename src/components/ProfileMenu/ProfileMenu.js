import styles from './ProfileMenu.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOutRequest } from '../../services/actions/userRequests.js';


export const ProfileMenu = () => {

    const dispatch = useDispatch();

    const logOut = () => {
        const refreshToken = localStorage.getItem('refreshToken');
        dispatch(logOutRequest(refreshToken))
    };

    return (
        <nav className={styles.description}>
            <NavLink to='/profile'
                className={styles.button} 
                activeClassName={styles.link_active}>Профиль
            </NavLink>
            <NavLink to='/profile/orders'
                className={styles.button}
                activeClassName={styles.link_active}>История заказов
            </NavLink>
            <NavLink to='/login'
                activeClassName={styles.link_active}
                className={styles.button}
                onClick={logOut}>Выход
            </NavLink>
            <p className={`${styles.info} mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
        </nav>
    )
};

export default ProfileMenu;