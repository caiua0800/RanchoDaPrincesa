import './App.css';
import React, { useState } from "react";
import LoginPage from './Componentes/LoginPage';
import Navbar from './Componentes/Navbar'
import Cadastrar from './Componentes/Cadastrar'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ModalSaveData from "./Componentes/ModalSaveData";
import Cadastros from './Componentes/Cadastros'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalState, setModalState] = useState('d-none');
  const [modalData, setModalData] = useState([]);


  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} />
        <ModalSaveData modalData={modalData} state={modalState} setModalState={setModalState}></ModalSaveData>
        <Routes>
          {!isLoggedIn ? (
            <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          ) : (
            <>
              <Route path="/cadastrar" element={<Cadastrar isLoggedIn={isLoggedIn} setModalData={setModalData} setModalState={setModalState} />} />
              <Route path="/cadastros" element={<Cadastros isLoggedIn={isLoggedIn} />} />
              <Route path="*" element={<Navigate to="/cadastros" />} /> 
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
