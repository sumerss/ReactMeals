import styles from './Modal.module.css'
import { Fragment } from 'react';
import ReactDom from 'react-dom';

const Backdrop = props => {
    return <div className={styles.backdrop} onClick={props.onClick}></div>
}

const ModalOverlay = props => {
    return <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
    </div>
}

const portalElement = document.getElementById('overlays')

const Modal = props => {

    return <Fragment>
        {ReactDom.createPortal(<Backdrop onClick={props.onClick} />, portalElement)}
        {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
}
export default Modal;