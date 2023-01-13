import { FC, useEffect, KeyboardEvent } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { IModalProps } from '../../services/types/data';


const modalsContainer: HTMLElement = document.querySelector('#react-modals') as HTMLElement;

const Modal: FC<IModalProps> = ({ onClose, children, handleCloseModal }) => {

    useEffect(() => {
        function handleCloseByEsc(evt: {key: string}) {
            evt.key === "Escape" && handleCloseModal();
        };
        document.addEventListener('keydown', handleCloseByEsc)
        return() => {
            document.removeEventListener('keydown', handleCloseByEsc);
        };
    }, [handleCloseModal]);

    
    return ReactDOM.createPortal(
        <>
            <div className={styles.modal}>
                {children}
                <div className={styles.closeIcon} onClick={handleCloseModal}> 
                    <CloseIcon type="primary" />
                </div>
            </div>
            <ModalOverlay onClose={onClose}/>
       </>, modalsContainer
    )
};


export default Modal;


  
