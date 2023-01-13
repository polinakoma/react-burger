import styles from './ProfileMenu.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/hooks'; 
import { logOutRequest } from '../../services/actions/userRequests';
import { FC } from 'react';


const ProfileMenu: FC = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    const logOut = () => {
        const refreshToken = localStorage.getItem('refreshToken');
        dispatch(logOutRequest(refreshToken))
    };

    let hintText = 'В этом разделе вы можете изменить свои персональные данные';
    if(location.pathname.includes('/profile/orders')) {
        hintText = 'В этом разделе вы можете просмотреть свою историю заказов'
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
            <p className={`${styles.info} mt-20`}>{hintText}</p>
        </nav>
    )
};


export default ProfileMenu;