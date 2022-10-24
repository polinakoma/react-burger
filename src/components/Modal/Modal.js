import { useEffect } from 'react' 
import ReactDOM from 'react-dom'
import styles from './Modal.module.css'
import ModalOverlay from '../ModalOverlay/ModalOverlay.js'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';


const modalsContainer = document.querySelector('#react-modals');

const Modal = ({ onClose, children, handleCloseModal }) => {

    useEffect(() => {

        function handleCloseByEsc(evt) {
            evt.key === "Escape" && handleCloseModal();
        };

        document.addEventListener('keydown', handleCloseByEsc)

        return() => {
            document.removeEventListener('keydown', handleCloseByEsc);
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

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    handleCloseModal: PropTypes.func.isRequired
};


export default Modal


  
