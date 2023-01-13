import styles from './login.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { settingNewPasswordRequest } from '../services/actions/userRequests';
import { useCallback, FC } from 'react';
import { EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from '../services/hooks';


const ResetPassword: FC = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const email = useSelector((state) => state.userRequestReducer.email)

    if(!email) {
        history.push('/forgot-password')
    };

    const {values, handleChange } = useForm({password: '', token: ''});

    const redirect = () => {history.push('/')} 

    const settingNewPassword = useCallback((evt: any) =>  {
        evt.preventDefault();
        dispatch(settingNewPasswordRequest(values, redirect));
    }, [values, dispatch]
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Восстановление пароля</h1>
            <form className={styles.form} onSubmit={settingNewPassword} 
            name="password_reset">
                <PasswordInput
                    onChange={handleChange}
                    value={values.password}
                    placeholder="Введите новый пароль"
                    name={'password'}
                    extraClass="mb-6 mt-6"
                />
                <EmailInput
                    onChange={handleChange}
                    value={values.token}
                    placeholder="Введите код из письма"
                    name={'token'}
                    isIcon={false}
                    extraClass="mb-6"
                />
                <div className={styles.submit_button}>
                    <Button
                        type="primary"
                        size="medium"
                        htmlType='submit'>Сохранить
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