import './styles/ModalSaveData.css';
import React from 'react';
import { format } from 'date-fns';

export default function ModalSaveData({ modalData, state, setModalState }) {

    const handleCloseModal = () => {
        setModalState('d-none');
    }

    const handleSaveContentModal = () => {
        setModalState('d-none');
    }

    const formatarData = (data) => {
        if (data)
            return format(new Date(data), 'dd/MM/yyyy');
    }

    return (
        <div className={state}>
            <div className='box-modal'>
                <h3>Confirme os Dados</h3>

                <div className='data-box'>

                    {Object.entries(modalData).map(([key, value]) => (
                        <div key={key} className="data-item">
                            {key === 'birth' ? <span>{formatarData(value)}</span> : <span>{value}</span>}
                        </div>
                    ))}

                </div>

                <hr />

                <div className='buttons'>
                    <button className='cancel' onClick={handleCloseModal}>CANCELAR</button>
                    <button className='save' onClick={handleSaveContentModal}>CONFIRMAR</button>
                </div>

            </div>
        </div>
    )
}