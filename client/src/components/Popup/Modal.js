import React from 'react';
import ReactDOM from 'react-dom';
import AppFirebase from '../Firebase/AppFirebase';

const Modal = ({ isShowing, hide,children }) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
        <div className="modal-overlay" />
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
                {children}
                <div className="modal-header">
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <AppFirebase />
            </div>
        </div>
    </React.Fragment>, document.body
) : null;

export default Modal;