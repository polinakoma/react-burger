import styles from './login.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPasswordRequest }from '../services/actions/userRequests';
import { useCallback, FC,FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from '../services/hooks';
import { Link } from 'react-router-dom';
import { useForm } from '../services/hooks';


const ForgotPassword: FC = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const {values, handleChange } = useForm({ email: '' });
    const redirect = () => {history.push('/reset-password')} 

    const forgotPassword = useCallback((event: FormEvent) => {
        event.preventDefault();
        dispatch(resetPasswordRequest(values, redirect));
    }, [values, dispatch]
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Восстановление пароля</h1>
            <form className={styles.form} onSubmit={forgotPassword} name="restore_password">
                <EmailInput
                    onChange={handleChange}
                    value={values.email}
                    name={'email'}
                    placeholder="Укажите e-mail"
                    isIcon={false}
                    extraClass="mb-6 mt-6"
                    required>
                </EmailInput>
                <div className={styles.submit_button}>
                    <Button
                        type="primary"
                        size="medium"
                        htmlType='submit'>Восстановить
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