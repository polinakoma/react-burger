import styles from './login.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ResetPasswordRequest }from '../services/actions/user_requests.js';
import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


const ForgotPassword = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [form, setValue] = useState('');

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const redirect = () => {history.push('/reset-password')} 

    const forgotPassword = useCallback((e) => {
        e.preventDefault();
        dispatch(ResetPasswordRequest(form, redirect));
    }, [form, dispatch]
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Восстановление пароля</h1>
            <form className={styles.form} name="restore_password">
                <EmailInput
                    onChange={onChange}
                    value={form.email}
                    name={'email'}
                    placeholder="Укажите e-mail"
                    isIcon={false}
                    extraClass="mb-6 mt-6">
                </EmailInput>
                <div className={styles.submit_button}>
                    <Button
                        type="primary"
                        size="medium"
                        htmlType='submit'
                        onClick={forgotPassword}>Восстановить
                    </Button>
                </div> 
            </form>
            <div className={`${styles.actions} mt-20`}>
                <p className={styles.text}>Вспомнили пароль?</p>
                <Link to='/login' className={styles.text_button}>&#8194;Войти</Link>
            </div>
        </div>
    )
};


export default ForgotPassword;