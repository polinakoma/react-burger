import styles from './login.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { settingNewPasswordRequest } from '../services/actions/user_requests.js';
import { useState, useCallback } from 'react';
import { EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';


const ResetPassword = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const email = useSelector((state) => state.userRequestReducer.email)

    if(!email) {
        history.push('/forgot-password')
    }
    
    const [form, setValue] = useState({ password: '', token: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const redirect = () => {history.push('/')} 

    const settingNewPassword = useCallback((e) =>  {
        e.preventDefault();
        dispatch(settingNewPasswordRequest(form, redirect));
    }, [form, dispatch]
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Восстановление пароля</h1>
            <form className={styles.form} name="password_reset">
                <PasswordInput
                    onChange={onChange}
                    value={form.password}
                    placeholder="Введите новый пароль"
                    name={'password'}
                    extraClass="mb-6 mt-6"
                />
                <EmailInput
                    onChange={onChange}
                    value={form.token}
                    placeholder="Введите код из письма"
                    name={'token'}
                    isIcon={false}
                    extraClass="mb-6"
                />
                <div className={styles.submit_button}>
                    <Button
                        type="primary"
                        size="medium"
                        htmlType='submit'
                        onClick={settingNewPassword}>Сохранить
                    </Button>
                </div> 
            </form>
            <div className={`${styles.actions} mt-20`}>
                <p className={styles.text}>Вспомнили пароль?</p>
                <Link to='/login' className={styles.text_button}>&#8194;Войти</Link>
            </div>
        </div>
    )
}


export default ResetPassword;