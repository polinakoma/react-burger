import styles from './ModalOverlay.module.css'
import PropTypes from 'prop-types';


const ModalOverlay = ({ onClose }) => {

    return (
        <div className={styles.overlay} onClick={onClose}></div>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
};


export default ModalOverlay