import styles from './ModalOverlay.module.css';
import { FC } from 'react';
import { IModalOverlayProps } from '../../services/types/data';


const ModalOverlay: FC<IModalOverlayProps> = ({ onClose }) => {

    return (
        <div className={styles.overlay} onClick={onClose}></div>
    )
};

export default ModalOverlay;