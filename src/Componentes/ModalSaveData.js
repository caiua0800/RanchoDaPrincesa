import './styles/ModalSaveData.css';
import React, { useState } from 'react';
import { format } from 'date-fns';
import { getFirestore, setDoc, collection, doc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig';

export default function ModalSaveData({ modalData, state, setModalState }) {

    const [load, setLoad] = useState('d-none');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const handleConfirmar = async () => {

        try {

            setLoad('loading');

            await setDoc(doc(db, 'Clientes', modalData.cpf), {
                ...modalData
            });
            setLoad('d-none');
             setTimeout(() => {
                window.location.reload()
            }, 500);

        } catch (error) {
            alert(`Erro ao dalvar cliente: ${error}`);
        }
        setModalState('d-none');
    };

    const handleCloseModal = () => {
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
                    <button className='save' onClick={handleConfirmar}>CONFIRMAR</button>
                </div>

                <div className={load}>

                    <div className="c-loader"></div>

                </div>
            </div>
        </div>
    )
}