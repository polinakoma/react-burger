import React, { useEffect } from 'react' 
import ReactDOM from 'react-dom'
import styles from './Modal.module.css'
import ModalOverlay from '../ModalOverlay/ModalOverlay.js'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'


const modalsContainer = document.querySelector('#react-modals');

const Modal = ({ onClose, children, handleCloseModal }) => {

    useEffect(() => {
        document.addEventListener('keydown', (evt) => {
            evt.key === "Escape" && handleCloseModal();
        })

        return() => {
            document.removeEventListener('keydown', (evt) => {
                evt.key === "Escape" && handleCloseModal();
            });
        };
    }, [])

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


export default Modal


  
