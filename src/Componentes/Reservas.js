import Container from './Container';
import './styles/Reservas.css';
import React, { useState, useEffect } from 'react';
import firebaseConfig from './firebaseConfig';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import ModalReservas from './ModalReservas';

export default function Reservas() {

    const [reservas, setReservas] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [modalClass, setModalClass] = useState('d-none');
    const [reservaClicked, setReservaClicked] = useState({});



    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const fetchReservas = async () => {
        try {
            const ReservasCollection = collection(db, 'Reservas');
            const snapshot = await getDocs(ReservasCollection);
            const ReservasList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setReservas(ReservasList);
        } catch (error) {
            console.error("Erro ao buscar reservas: ", error);
        }
    };

    useEffect(() => {
        fetchReservas();
    }, []);

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', options);
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const filterReservasByMonth = () => {
        if (!selectedMonth) return reservas;

        return reservas.filter(reserva => {
            const checkInMonth = new Date(reserva.checkIn).getMonth() + 1;
            const checkOutMonth = new Date(reserva.checkOut).getMonth() + 1;
            return checkInMonth.toString() === selectedMonth || checkOutMonth.toString() === selectedMonth;
        });
    };

    const modalState = (reserva) => {
        setReservaClicked(reserva); 
        if (modalClass === 'd-none') {
            setModalClass('ModalReservas');
        } else {
            setModalClass('d-none');
        }
    };


    return (
        <div className='Reservas'>
            <Container>
                <ModalReservas setReservas={setReservas} setModalClass={setModalClass} modalClass={modalClass} reserva={reservaClicked} />
                <select id='mes' value={selectedMonth} onChange={handleMonthChange}>
                    <option value="">TODAS</option>
                    <option value="1">JANEIRO</option>
                    <option value="2">FEVEREIRO</option>
                    <option value="3">MARÇO</option>
                    <option value="4">ABRIL</option>
                    <option value="5">MAIO</option>
                    <option value="6">JUNHO</option>
                    <option value="7">JULHO</option>
                    <option value="8">AGOSTO</option>
                    <option value="9">SETEMBRO</option>
                    <option value="10">OUTUBRO</option>
                    <option value="11">NOVEMBRO</option>
                    <option value="12">DEZEMBRO</option>
                </select>

                <div id='reservas'>
                    {filterReservasByMonth().map((reserva, key) => (
                        <div className='reserva' key={key} onClick={() => modalState(reserva)}>
                            <div>
                                <h4>CHECKIN - CHECKOUT</h4>
                                <h4>{formatDate(reserva.checkIn)} - {formatDate(reserva.checkOut)}</h4>
                            </div>
                            <h4>{reserva.responsavelNome}</h4>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}
