import './styles/ModalClient.css';
import React from 'react';

export default function ModalClient({ showModal, setShowModal, setInputState, children }) {
    return (
        <div className={showModal ? 'ModalClient' : 'd-none'}>
            <div className="modal-content">
                <button className="close-btn" onClick={() => {
                    setShowModal(false);setInputState(true)
                    }}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}
