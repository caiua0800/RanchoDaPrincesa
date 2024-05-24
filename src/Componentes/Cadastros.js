import './styles/Cadastros.css';
import React, { useEffect, useState } from 'react';
import Container from './Container';
import Cad from './Cad';
import firebaseConfig from './firebaseConfig';
import { getFirestore, collection, getDocs, deleteDoc, doc as firestoreDoc, setDoc } from 'firebase/firestore'; // Importação principal
import { query, where } from 'firebase/firestore'; // Importação adicional necessária
import { initializeApp } from 'firebase/app';
import { Link } from 'react-router-dom';
import ModalClient from './ModalClient';

export default function Cadastros() {
    const [clientes, setClientes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [clickedClient, setClickedClient] = useState(null);
    const [inputState, setInputState] = useState(true);

    const [editedNome, setEditedNome] = useState('');
    const [editedSobrenome, setEditedSobrenome] = useState('');
    const [editedCPF, setEditedCPF] = useState('');
    const [editedEndereco, setEditedEndereco] = useState('');
    const [editedBairro, setEditedBairro] = useState('');
    const [editedCEP, setEditedCEP] = useState('');

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const fetchClientes = async () => {
        try {
            const clientesCollection = collection(db, 'Clientes');
            const snapshot = await getDocs(clientesCollection);
            const clientesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setClientes(clientesList);
        } catch (error) {
            console.error("Erro ao buscar clientes: ", error);
        }
    };

    const fetchReservasAnteriores = async (cpf) => {
        try {
            const reservasCollection = collection(db, 'Reservas');
            const q = query(reservasCollection, where('responsavel', '==', cpf));
            const snapshot = await getDocs(q);
            const reservasAnteriores = snapshot.docs.map(doc => doc.data());
            return reservasAnteriores; // Retornar os dados das reservas anteriores
        } catch (error) {
            console.error("Erro ao buscar reservas anteriores: ", error);
            return []; // Retorna um array vazio em caso de erro
        }
    };

    const handleReservasAnterioresClick = async () => {
        try {
            if (!clickedClient || !clickedClient.cpf) {
                throw new Error('Cliente não selecionado ou CPF inválido.');
            }
            // Chame a função fetchReservasAnteriores com o CPF do cliente clicado
            const reservas = await fetchReservasAnteriores(clickedClient.cpf);
            
            // Abra uma nova janela com os dados JSON formatados
            const formattedJson = JSON.stringify(reservas, null, 2); // Indentação de 2 espaços
            const newWindow = window.open();
            newWindow.document.write(`<pre>${formattedJson}</pre>`);
        } catch (error) {
            console.error('Erro ao buscar reservas anteriores: ', error);
        }
    };
    
    

    useEffect(() => {
        fetchClientes();
    }, []);

    const handleClientClick = (cliente) => {
        setClickedClient(cliente);
        setShowModal(true);
        setEditedNome(cliente.nome);
        setEditedSobrenome(cliente.sobrenome);
        setEditedCPF(cliente.cpf);
        setEditedEndereco(cliente.adress);
        setEditedBairro(cliente.bairro);
        setEditedCEP(cliente.cep);
    };

    const handleEditClick = () => {
        setInputState(false);
    }

    const handleDeleteClick = async () => {
        setShowModal(false);
        setInputState(true);
    
        try {
            // Verifica se clickedClient está definido e possui um CPF válido
            if (!clickedClient || !clickedClient.cpf) {
                throw new Error('Cliente não selecionado ou CPF inválido.');
            }
            
            // Obtém a referência do documento no Firestore usando o CPF do cliente
            const clienteRef = firestoreDoc(db, 'Clientes', clickedClient.cpf);
            await deleteDoc(clienteRef); // Usando deleteDoc() para excluir o documento
            await fetchClientes();
            alert('Cliente deletado com sucesso!');
        } catch (error) {
            alert('Erro ao deletar cliente: ', error);
        }
    }
    
    
    


    const handleSaveClick = async () => {
        setInputState(true);
    
        try {
            const clienteRef = firestoreDoc(db, 'Clientes', clickedClient.cpf);
            const updatedCliente = {
                ...clickedClient,
                nome: editedNome,
                sobrenome: editedSobrenome,
                cpf: editedCPF,
                adress: editedEndereco,
                bairro: editedBairro,
                cep: editedCEP
            };
            await setDoc(clienteRef, updatedCliente);
            // Atualizar os clientes após salvar as alterações
            await fetchClientes();
            alert('Informações do cliente salvas com sucesso!');
        } catch (error) {
            alert('Erro ao salvar informações do cliente: ', error);
        }
    }
    

    useEffect(() => {
        if (clickedClient) {
            fetchClientes();
        }
    }, [clickedClient]);

    return (
        <div className='Cadastros'>
            {showModal && (
                <ModalClient setInputState={setInputState} showModal={showModal} setShowModal={setShowModal}>
                    <h2>Detalhes do Cliente</h2>
                    {clickedClient && (
                        <div className='client-details'>
                            <div>
                                <p>Nome</p>
                                <input 
                                    disabled={inputState} 
                                    value={editedNome} 
                                    onChange={(e) => setEditedNome(e.target.value)} 
                                />
                            </div>
                            <div>
                                <p>Sobrenome</p>
                                <input 
                                    disabled={inputState} 
                                    value={editedSobrenome} 
                                    onChange={(e) => setEditedSobrenome(e.target.value)} 
                                />
                            </div>
                            <div>
                                <p>CPF</p>
                                <input 
                                    disabled={inputState} 
                                    value={editedCPF} 
                                    onChange={(e) => setEditedCPF(e.target.value)} 
                                />
                            </div>
                            <div>
                                <p>Endereço</p>
                                <input 
                                    disabled={inputState} 
                                    value={editedEndereco} 
                                    onChange={(e) => setEditedEndereco(e.target.value)} 
                                />
                            </div>
                            <div>
                                <p>Bairro</p>
                                <input 
                                    disabled={inputState} 
                                    value={editedBairro} 
                                    onChange={(e) => setEditedBairro(e.target.value)} 
                                />
                            </div>
                            <div>
                                <p>CEP</p>
                                <input 
                                    disabled={inputState} 
                                    value={editedCEP} 
                                    onChange={(e) => setEditedCEP(e.target.value)} 
                                />
                            </div>
                            <button onClick={handleReservasAnterioresClick} id='reservas-ant'>RESERVAS ANTERIORES</button>
                        </div>
                    )}
                    <div className='client-buttons'>
                        <button onClick={handleDeleteClick} className='delete' doc={clickedClient.cpf}>DELETAR</button>
                        <button onClick={handleEditClick} className={!inputState ? 'd-none' : 'edit'} doc={clickedClient.cpf}>EDITAR</button>
                        <button onClick={handleSaveClick} className={!inputState ? 'save' : 'd-none'} doc={clickedClient.cpf}>SALVAR</button>
                    </div>
                </ModalClient>
            )}
            <Container>
                <div className='all-cadastros'>
                    {clientes.map(cliente => (
                        <Cad
                            key={cliente.id}
                            nome={cliente.nome}
                            sobrenome={cliente.sobrenome}
                            cpf={cliente.cpf}
                            adress={cliente.address}
                            bairro={cliente.bairro}
                            cep={cliente.cep}
                            setShowModal={() => handleClientClick(cliente)}
                        />
                    ))}
                </div>

                <div className='buttons-cadastros'>
                    <Link to='/cadastrar'><button>CRIAR NOVO CADASTRO</button></Link>
                </div>

            </Container>
        </div>
    );
}
