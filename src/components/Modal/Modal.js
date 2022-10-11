import React, { useEffect } from 'react' 
import ReactDOM from 'react-dom'
import styles from './Modal.module.css'
import ModalOverlay from '../ModalOverlay/ModalOverlay.js'


const modalsContainer = document.querySelector('#react-modals');

const Modal = ({ onOverlayClick, onEscKeydown, children }) => {

    useEffect(() => {
        document.addEventListener('keydown', onEscKeydown)

        return() => {
            document.removeEventListener('keydown', onEscKeydown)
        };
    }, [])

    return ReactDOM.createPortal(
        <>
            <div className={styles.modal}>
                {children}
            </div>
            <ModalOverlay onClick={onOverlayClick}/>
       </>, modalsContainer
    )
};


export default Modal


  
