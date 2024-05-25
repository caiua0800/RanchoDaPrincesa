import './styles/Reservar.css';
import React, { useState, useEffect } from 'react';
import Container from './Container';
import firebaseConfig from './firebaseConfig';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

export default function Reservar() {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedResponsible, setSelectedResponsible] = useState('');

    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [qtdePessoas, setQtdePessoas] = useState('');
    const [chales, setChales] = useState('');
    const [total, setTotal] = useState('');
    const [jaPago, setJaPago] = useState('');

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);


    const searchFirestore = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'Clientes'));
            const results = querySnapshot.docs.map(doc => doc.data());
            setSearchResults(results);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    // Função para filtrar os resultados de acordo com o input do usuário
    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleReserve = async () => {
        try {
            // Salvar os dados da reserva no Firestore
            const reservaData = {
                checkIn: checkin,
                checkOut: checkout,
                qtdePessoas: qtdePessoas,
                chale: chales,
                responsavel: selectedResponsible ,
                total: total ,
                jaPago: jaPago,
                aPagar: (parseFloat(total) - parseFloat(jaPago)).toFixed(2)
            };
            await addDoc(collection(db, 'Reservas'), reservaData);
            alert('Reserva salva com sucesso!');
            handleClearAll();
        } catch (error) {
            console.error('Erro ao salvar reserva:', error);
        }
    };

    const handleClearAll = () => {
        setSearchInput('')
        setCheckin('')
        setCheckout('')
        setQtdePessoas('')
        setChales('')
        setTotal('')
        setJaPago('')
    }

    useEffect(() => {
        // Buscar os dados do Firestore quando o componente for montado
        searchFirestore();
    }, []);

    return (
        <div className='Reservar'>
            <Container>
                <div className='reserva-form'>
                    <div className='just-for-separation'>
                        <div className='flex-inputs checks'>
                            <div>
                                <p>Check-in</p>
                                <input className='setWidthAll' type='date' value={checkin} onChange={(e) => setCheckin(e.target.value)} />
                            </div>
                            <div>
                                <p>Check-out</p>
                                <input className='setWidthAll' type='date' value={checkout} onChange={(e) => setCheckout(e.target.value)} />
                            </div>
                            <div>
                                <p>Qtde/Pessoas</p>
                                <input className='setWidthAll' type='number' value={qtdePessoas} onChange={(e) => setQtdePessoas(e.target.value)} />
                            </div>
                        </div>
                        <div className='flex-inputs'>
                            <div>
                                <p>Chalés</p>
                                <select className='setWidthAll' id='chales' value={chales} onChange={(e) => setChales(e.target.value)}>
                                    <option value='null'>Selecione</option>
                                    <option value='caiua'>Caiuã</option>
                                    <option value='master'>Master</option>
                                    <option value='mayra'>Mayra</option>
                                    <option value='nathalia'>Nathalia</option>
                                    <option value='trancoso'>Trancoso</option>
                                </select>
                            </div>
                            <div>
                                <p>TOTAL R$</p>
                                <input className='setWidthAll' placeholder='valor total' value={total} onChange={(e) => setTotal(e.target.value)}/>
                            </div>
                            <div>
                                <p>JÁ PAGO R$</p>
                                <input className='setWidthAll' placeholder='valor já pago' value={jaPago} onChange={(e) => setJaPago(e.target.value)}/>
                            </div>
                        </div>
                        <div className='search-responsavel'>
                            <div>
                                <p>Responsável</p>
                                <input className='setWidthAll' type='text' placeholder='Nome ou CPF' value={searchInput} onChange={handleInputChange} />
                                <select onChange={(e) => setSelectedResponsible(e.target.value)}>
                                    <option value='null'>Selecione</option>
                                    {searchResults
                                        .filter(result => 
                                            (result.nome && result.nome.toLowerCase().includes(searchInput.toLowerCase())) || 
                                            (result.cpf && result.cpf.includes(searchInput)) || 
                                            (result.sobrenome && result.sobrenome.toLowerCase().includes(searchInput.toLowerCase())))
                                        .map(result => (
                                            <option key={result.id} value={result.cpf}>{result.nome} {result.sobrenome} ({result.cpf})</option>
                                        ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <button className='reservar' onClick={handleReserve}>RESERVAR</button>
                </div>
            </Container>
        </div>
    );
}
