import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.css'


const modalRoot = document.querySelector('#modal-root');

export function Modal({ modalClose, children }) { 

    
    useEffect(() => {

        const hendleEscClose = event => {
            if (event.code === 'Escape') {
                modalClose()
            }
        }

        window.addEventListener('keydown', hendleEscClose)
        return () => window.removeEventListener('keydown', hendleEscClose);
        
    }, [modalClose]);
    
    
    const hendleBackdropClose = event => {
        if (event.target === event.currentTarget) {
            modalClose()
        }
    }
    
        return createPortal (
            <div className={css.modalBackdrop} onClick={hendleBackdropClose}>
                {children}
            </div>, 
            modalRoot
        );

}

Modal.propTypes = {
    modalClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}