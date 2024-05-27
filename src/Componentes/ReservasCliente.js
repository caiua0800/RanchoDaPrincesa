import Container from './Container';
import './styles/ReservasCliente.css';
import React, { useState, useEffect } from 'react';
import firebaseConfig from './firebaseConfig';
import { getFirestore, collection, getDocs, deleteDoc, doc as firestoreDoc, setDoc, query, where } from 'firebase/firestore'; // Importações necessárias
import { initializeApp } from 'firebase/app';

export default function ReservasCliente({clientReserves}){

    const [reservas, setReservas] = useState([]); // Estado para armazenar as reservas

    // Inicializando o app e o Firestore
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    useEffect(() => {
        // Função para buscar as reservas do cliente
        const getReservas = async () => {
            const q = query(collection(db, 'Reservas'), where('responsavel', '==', clientReserves));
            const querySnapshot = await getDocs(q);
            const reservasData = [];
            querySnapshot.forEach((doc) => {
                reservasData.push(doc.data());
            });
            setReservas(reservasData);
        };

        getReservas();
    }, [clientReserves, db]);

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        // Cria uma data sem ajuste de fuso horário
        const [year, month, day] = dateString.split('-');
        const localDate = new Date(year, month - 1, day); // `month - 1` porque os meses em JavaScript começam em 0
        return localDate.toLocaleDateString('pt-BR', options);
    };

    return (
        <div className='ReservasCliente'>
            <h2 className='title-reservas'>HOSPEDAGENS ANTERIORES</h2>
            <h4>{clientReserves}</h4>
            <div className='reservas-anteriores'>
                {reservas.map((reserva, index) => (
                    <div key={index} className='reserva-anterior'>
                        <div className='div-reserva'>
                            <h3>Check-in / Check-out</h3>
                            <h4>{formatDate(reserva.checkIn)} - {formatDate(reserva.checkOut)}</h4>
                        </div>
                        <div className='div-reserva'>
                            <h3>Qtde. Pessoas</h3>
                            <h4>{reserva.qtdePessoas}</h4>
                        </div>
                        <div className='div-reserva'>
                            <h3>VALOR TOTAL</h3>
                            <h4>R${reserva.total}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
