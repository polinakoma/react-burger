import styles from './profile.module.css';
import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { logOutRequest } from '../services/actions/userRequests';
import { Route, useRouteMatch } from 'react-router-dom';
import { getCookie } from '../utils/cookie';
import { useCallback } from 'react';
import { saveUserData } from '../services/actions/userRequests';

const Profile = () => {

    const dispatch = useDispatch();
    const {path, url} = useRouteMatch();

    const userInfo = useSelector((state) => state.userRequestReducer.userInfo);
    let userEmail = userInfo.email
    let userName = userInfo.name

    const [name, setName] = useState(userName);
    const [email, setEmail] = useState(userEmail);
    const [password, setPassword] = useState('');

    const handleResetData = (e) => {
        e.preventDefault();
        setName(userName)
        setEmail(userEmail)
    }

    const logOut = () => {
        const refreshToken = localStorage.getItem('refreshToken');
        dispatch(logOutRequest(refreshToken))
    }

    const onChangeName = evt => {
        const value = evt.target.value;
        setName(value);
    };

    const onChangeEmail = evt => {
        const value = evt.target.value;
        setEmail(value);
    };

    const onChangePassword = evt => {
        const value = evt.target.value;
        setPassword(value);
    };

    const accessToken = getCookie('accessToken')

    const saveNewData = useCallback((e) => {
        e.preventDefault();
        dispatch(saveUserData(accessToken, name, email,password));
    }, [accessToken, name, email,password, dispatch]
    );

    return (
        <div className={styles.container}>
            <nav className={styles.description}>
                <NavLink to={`${url}`}
                    className={styles.button} 
                    activeClassName={styles.link_active}>Профиль
                </NavLink>
                <NavLink to={`${url}/orders`}
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

            <Route exact path={`${path}`}>  
                <form className={styles.profile_info} onSubmit={saveNewData} name="profile">
                    <Input
                        onChange={onChangeName}
                        value={name}
                        name={'name'}
                        placeholder="Имя"
                        icon={"EditIcon"}
                        extraClass="mb-6"
                        size={"default"}
                    />
                    <EmailInput
                        onChange={onChangeEmail}
                        value={email}
                        name={'email'}
                        placeholder="Логин"
                        icon={"EditIcon"}
                        extraClass="mb-6"
                        size={"default"}
                    />
                    <PasswordInput
                        onChange={onChangePassword}
                        value={password}
                        name={'password'}
                        placeholder="Пароль"
                        icon={"EditIcon"}
                        extraClass="mb-6"
                        size={"default"}
                    />
                    <div className={styles.buttons}>
                        <button className={styles.buttonCancel} 
                        onClick={handleResetData}>Отмена
                        </button>
                        <Button
                            type="primary"
                            size="medium"
                            htmlType='submit'>Сохранить
                        </Button> 
                    </div>
                </form>
            </Route>
            <Route path={`${path}/orders`} >
                <h1>Здесь будут заказы</h1>
            </Route>
        </div>
    )
};


export default Profile;