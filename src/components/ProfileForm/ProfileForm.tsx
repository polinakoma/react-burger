import styles from './ProfileForm.module.css';
import { Input, PasswordInput } from 
'@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../services/hooks';
import { FC } from 'react';
import { saveUserData } from '../../services/actions/userRequests';
import { useState, ChangeEvent, FormEvent, MouseEvent} from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';


const ProfileForm: FC = () => {

    const dispatch = useDispatch();

    const userInfo = useSelector((state) => state.userRequestReducer.userInfo);
    
    let userEmail = userInfo?.email
    let userName = userInfo?.name

    const [name, setName] = useState(userName);
    const [email, setEmail] = useState(userEmail);
    const [password, setPassword] = useState('');
    const [inputChange, setInputChange] = useState<boolean>(false);

    const handleResetData = (event: MouseEvent) => {
        event.preventDefault();
        setName(userName)
        setEmail(userEmail)
    };

    const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setName(value);
        value ? setInputChange(true) : setInputChange(false);
    };

    const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setEmail(value);
        value ? setInputChange(true) : setInputChange(false);
    };

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPassword(value);
        value ? setInputChange(true) : setInputChange(false);
    };

    const saveNewData = (event: FormEvent) => {
        event.preventDefault();
        dispatch(saveUserData(name, email, password));
    };

    return (
        <form className={styles.profile_info} onSubmit={saveNewData} name="profile">
            <Input
                onChange={onChangeName}
                value={name ? name : ''}
                name={'name'}
                placeholder="Имя"
                icon={"EditIcon"}
                extraClass="mb-6"
                size={"default"}
            />
            <Input 
                onChange={onChangeEmail}
                value={email ? email : ''}
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

            { inputChange && (
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
            )}
        </form>
    )
};

export default ProfileForm;