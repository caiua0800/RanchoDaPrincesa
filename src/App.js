import './App.css';
import React, { useState, useEffect } from "react";
import LoginPage from './Componentes/LoginPage';
import Navbar from './Componentes/Navbar';
import Cadastrar from './Componentes/Cadastrar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ModalSaveData from "./Componentes/ModalSaveData";
import Cadastros from './Componentes/Cadastros';
import Reservar from './Componentes/Reservar';
import Reservas from './Componentes/Reservas';
import SearchDate from './Componentes/SearchDate';
import ReservasCliente from './Componentes/ReservasCliente';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalState, setModalState] = useState('d-none');
  const [modalData, setModalData] = useState([]);

  const [clientReserves, setClientReserves] = useState('')

  useEffect(() => {
    // Verificar o armazenamento local ao carregar a página
    const userLoggedIn = localStorage.getItem('isLoggedIn');
    if (userLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    // Atualizar estado de login e armazenamento local ao fazer login
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    // Remover informações de login do armazenamento local ao fazer logout
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <ModalSaveData modalData={modalData} state={modalState} setModalState={setModalState}></ModalSaveData>
        <Routes>
          {!isLoggedIn ? (
            <Route path="/" element={<LoginPage setIsLoggedIn={handleLogin} />} />
          ) : (
            <>
              <Route path="/cadastrar" element={<Cadastrar isLoggedIn={isLoggedIn} setModalData={setModalData} setModalState={setModalState} />} />
              <Route path="/cadastros" element={<Cadastros setClientReserves={setClientReserves} isLoggedIn={isLoggedIn} />} />
              <Route path="/reservar" element={<Reservar isLoggedIn={isLoggedIn} />} />
              <Route path="/reservas" element={<Reservas isLoggedIn={isLoggedIn} />} />
              <Route path="/dates" element={<SearchDate isLoggedIn={isLoggedIn} />} />
              <Route path="/reservascliente" element={<ReservasCliente clientReserves={clientReserves} isLoggedIn={isLoggedIn} />} />
              <Route path="*" element={<Navigate to="/cadastros" />} /> 
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
