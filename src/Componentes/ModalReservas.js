import React, { useState, useEffect } from "react";
import './styles/ModalReservas.css';
import firebaseConfig from './firebaseConfig';
import { getFirestore, doc, updateDoc, deleteDoc  } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import Loading from './Loading';

export default function ModalReservas(props) {
    const { modalClass, reserva, setModalClass, setReservas } = props;
    const [disabled, setDisabled] = useState(true);
    const [currentReserva, setCurrentReserva] = useState({ ...reserva });
    const [load, setLoad] = useState('d-none');

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    useEffect(() => {
        setCurrentReserva({ ...reserva });
    }, [reserva]);

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', options);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentReserva({ ...currentReserva, [name]: value });
    };

    const handleSaveClick = async () => {
        setLoad('loading'); 
        const reservaDoc = doc(db, "Reservas", currentReserva.id);
        try {
            await updateDoc(reservaDoc, {
                responsavelNome: currentReserva.responsavelNome,
                checkIn: currentReserva.checkIn,
                checkOut: currentReserva.checkOut,
                qtdePessoas: currentReserva.qtdePessoas,
                chale: currentReserva.chale,
                total: currentReserva.total,
                jaPago: currentReserva.jaPago,
                aPagar: (parseFloat(currentReserva.total) - parseFloat(currentReserva.jaPago)).toFixed(2)
            });
            setDisabled(true);
            alert("Reserva atualizada com sucesso!");
        } catch (error) {
            alert("Erro ao atualizar a reserva: ", error);
        } finally {
            setLoad('d-none'); // Hide loading spinner
        }
    };

    const handleCloseModal = () => {
        setCurrentReserva({ ...reserva });
        setModalClass('d-none');
        setDisabled(true);
    }

    const handleDeleteClick = async () => {
        setLoad('loading'); 
        const reservaDoc = doc(db, "Reservas", currentReserva.id);
        try {
            await deleteDoc(reservaDoc);
            // Remover a reserva excluída do estado 'reservas'
            setReservas(prevReservas => prevReservas.filter(reserva => reserva.id !== currentReserva.id));
            setModalClass('d-none'); // Esconde o modal após excluir
            alert("Reserva excluída com sucesso!");
        } catch (error) {
            alert("Erro ao excluir a reserva: " + error);
        } finally {
            setLoad('d-none'); // Esconde o indicador de carregamento
        }
    };


    return (
        <div className={modalClass}>
            <Loading load={load} />


            <div className="ModalContent">
                <button onClick={ () => {handleCloseModal()}}>X</button>

                <h2>Informações Reserva</h2>
                <div className="div-content">
                    <h4>Responsável:</h4>
                    <input
                        name="responsavelNome"
                        disabled={disabled}
                        value={currentReserva.responsavelNome || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="div-content">
                    <h4>Check-in:</h4>
                    <input
                        name="checkIn"
                        disabled={disabled}
                        value={formatDate(currentReserva.checkIn) || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="div-content">
                    <h4>Check-out:</h4>
                    <input
                        name="checkOut"
                        disabled={disabled}
                        value={formatDate(currentReserva.checkOut) || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="div-content">
                    <h4>Pessoas:</h4>
                    <input
                        name="qtdePessoas"
                        disabled={disabled}
                        value={currentReserva.qtdePessoas || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="div-content">
                    <h4>Chalés:</h4>
                    <input
                        name="chale"
                        disabled={disabled}
                        value={currentReserva.chale || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="div-content">
                    <h4>Total: R$</h4>
                    <input
                        name="total"
                        disabled={disabled}
                        value={currentReserva.total || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="div-content">
                    <h4>Já Pago: R$</h4>
                    <input
                        name="jaPago"
                        disabled={disabled}
                        value={currentReserva.jaPago || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="div-content">
                    <h4>Restante: R$</h4>
                    <input
                        name="aPagar"
                        disabled
                        value={currentReserva.aPagar || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="botoes-modal">
                    <button className="delete" onClick={handleDeleteClick}>Excluir</button>
                    <button onClick={() => setDisabled(false)} className={!disabled ? 'd-none' : 'edit'}>Editar</button>
                    <button onClick={handleSaveClick} className={disabled ? 'd-none' : 'save'}>Salvar</button>
                </div>
            </div>
        </div>
    );
}
