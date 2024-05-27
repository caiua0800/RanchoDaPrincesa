import './styles/Reservar.css';
import React, { useState, useEffect } from 'react';
import Container from './Container';
import firebaseConfig from './firebaseConfig';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { Link } from 'react-router-dom';
import { verificarDisponibilidade } from '../dataAlgorithm';

export default function Reservar() {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedResponsible, setSelectedResponsible] = useState('');
    const [selectedResponsibleNome, setSelectedResponsibleNome] = useState('');

    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [qtdePessoas, setQtdePessoas] = useState('');
    const [chales, setChales] = useState(['']);
    const [total, setTotal] = useState('');
    const [jaPago, setJaPago] = useState('');

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const searchFirestore = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'Clientes'));
            const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setSearchResults(results);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSelectResponsible = (e) => {
        const selectedCpf = e.target.value;
        setSelectedResponsible(selectedCpf);
        const selectedClient = searchResults.find(result => result.cpf === selectedCpf);
        if (selectedClient) {
            setSelectedResponsibleNome(`${selectedClient.nome} ${selectedClient.sobrenome}`);
        } else {
            setSelectedResponsibleNome('');
        }
    };

    const handleReserve = async () => {
        try {
            const reservaData = {
                checkIn: checkin,
                checkOut: checkout,
                qtdePessoas: qtdePessoas,
                chale: chales.join(', '),
                responsavel: selectedResponsible,
                responsavelNome: selectedResponsibleNome,
                total: total,
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
        setSearchInput('');
        setCheckin('');
        setCheckout('');
        setQtdePessoas('');
        setChales(['']);
        setTotal('');
        setJaPago('');
        setSelectedResponsible('');
        setSelectedResponsibleNome('');
    };

    const handleAddChaleInput = () => {
        setChales(prevChales => [...prevChales, '']);
    };

    useEffect(() => {
        searchFirestore();
    }, []);

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        // Cria uma data sem ajuste de fuso horário
        const [year, month, day] = dateString.split('-');
        const localDate = new Date(year, month - 1, day); // `month - 1` porque os meses em JavaScript começam em 0
        return localDate.toLocaleDateString('pt-BR', options);
    };

    useEffect(() => {
        const verificarChales = async () => {
            if (checkin && checkout && chales.length > 0 && chales[0] !== '') {
                const reservasSnapshot = await getDocs(collection(db, 'Reservas'));
                const reservas = reservasSnapshot.docs.map(doc => doc.data());

                const result = verificarDisponibilidade(checkin, checkout, chales, reservas);

                if (result.indisponiveis.length > 0) {
                    const messages = result.indisponiveis.map((chale, index) => {
                        const hospede = result.hospedesEncontrados[index];
                        return `${result.hospedesEncontrados[index].responsavel}, está usando o chalé ${chale} na data ${formatDate(hospede.checkin)} - ${formatDate(hospede.checkout)}`;
                    });
                    alert(messages.join('\n'));
                } else {
                    alert('Todos os chalés selecionados estão disponíveis.');
                }
            }
        };

        verificarChales();
    }, [checkin, checkout, chales]);

    const handleRemoveChale = (key) => {
        setChales(prevChales => prevChales.filter((_, index) => index !== key));
    }

    return (
        <div className='Reservar'>
            <Container>
                <div className='reserva-form'>
                    <div className='searchDateLink'>
                        <Link to='/dates'><button>VER DISPONIBILIDADE</button></Link>
                    </div>
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
                        <div className='flex-inputs chales'>
                            {chales.map((chale, index) => (
                                <div className='div-chale' key={index}>
                                    <div>
                                        <p>Chalé {index + 1}</p>
                                        <select className='setWidthAll' value={chale} onChange={(e) => {
                                            const newChales = [...chales];
                                            newChales[index] = e.target.value;
                                            setChales(newChales);
                                        }}>
                                            <option value=''>Selecione</option>
                                            <option value='Caiuã'>Caiuã</option>
                                            <option value='Master'>Master</option>
                                            <option value='Mayra'>Mayra</option>
                                            <option value='Luana'>Luana</option>
                                            <option value='Trancoso'>Trancoso</option>
                                        </select>
                                    </div>
                                    <button onClick={() => handleRemoveChale(index)} className='remove'>-</button>
                                </div>
                            ))}
                            <div>
                                <button onClick={handleAddChaleInput}>+</button>
                            </div>
                        </div>
                        <div className='flex-inputs div-s'>
                            <div>
                                <p>TOTAL R$</p>
                                <input className='setWidthAll' placeholder='valor total' value={total} onChange={(e) => setTotal(e.target.value)} />
                            </div>
                            <div>
                                <p>JÁ PAGO R$</p>
                                <input className='setWidthAll' placeholder='valor já pago' value={jaPago} onChange={(e) => setJaPago(e.target.value)} />
                            </div>
                        </div>
                        <div className='search-responsavel'>
                            <div>
                                <p>Responsável</p>
                                <input className='setWidthAll' type='text' placeholder='Nome ou CPF' value={searchInput} onChange={handleInputChange} />
                                <select className='setWidthAll' value={selectedResponsible} onChange={handleSelectResponsible}>
                                    <option value=''>Selecione</option>
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
