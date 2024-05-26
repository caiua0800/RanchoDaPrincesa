import React, { useState, useEffect } from "react";
import './styles/SearchDate.css';
import firebaseConfig from './firebaseConfig';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import procurarDisponibilidade from '../dataAlgorithm';
import Container from "./Container";
import { Link } from "react-router-dom";

const formatarDataBrasileira = (data) => {
    if (!data) return ''; // Verifica se a data é indefinida e retorna uma string vazia
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
};

export default function SearchDate() {
    const [reservas, setReservas] = useState([]);
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [resultado, setResultado] = useState(null);

    useEffect(() => {
        const fetchReservas = async () => {
            const app = initializeApp(firebaseConfig);
            const db = getFirestore(app);
            const reservasCollection = collection(db, 'Reservas');
            const reservasSnapshot = await getDocs(reservasCollection);
            const reservasData = reservasSnapshot.docs.map(doc => doc.data());
            setReservas(reservasData);
        };

        fetchReservas();
    }, []);

    const handleSearch = () => {
        const { hospedesEncontrados, chalesDisponiveis } = procurarDisponibilidade(checkin, checkout, reservas);
        setResultado({ hospedesEncontrados, chalesDisponiveis });
    };

    return (
        <div className="SearchDate">
            <Container>
                <Link className="voltarBtn" to='/reservar'><button>VOLTAR</button></Link>
                <div className="searching-area">
                    <input
                        type="text"
                        placeholder="Check-in"
                        value={checkin}
                        onChange={(e) => setCheckin(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Check-out"
                        value={checkout}
                        onChange={(e) => setCheckout(e.target.value)}
                    />
                    <button onClick={handleSearch}>Buscar</button>
                </div>

                <div className="results">
                    {resultado && (
                        <div className="results-divs">
                            <h2>Hóspedes Encontrados:</h2>
                            {resultado.hospedesEncontrados.map((hospede, index) => (
                                <div className="result" key={index}>
                                    <div>
                                        <h4>Responsável: {hospede.responsavel}</h4>
                                        <h4>Chalé(s): {hospede.chales}</h4>
                                        {/* <h4>QTDE/PESSOAS: {hospede.qtdePessoas}</h4> */}
                                    </div>

                                    <div>
                                        <h4>Check-in: {formatarDataBrasileira(hospede.checkin)}</h4>
                                        <h4>Check-out: {formatarDataBrasileira(hospede.checkout)}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
                {resultado && (
                        <div className="disponiveis">
                            <h2>Chalés Disponíveis</h2>
                            <div>
                                {resultado.chalesDisponiveis.map((chale, index) => (
                                    <p key={index}>{chale}</p>
                                ))}
                            </div>
                        </div>
                    )}
            </Container>
        </div>
    );
}
