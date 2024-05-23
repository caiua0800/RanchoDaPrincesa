import './App.css';
import React, { useState } from "react";
import LoginPage from './Componentes/LoginPage';
import Navbar from './Componentes/Navbar'
import Cadastrar from './Componentes/Cadastrar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ModalSaveData from "./Componentes/ModalSaveData";


function App() {


  const [modalState, setModalState] = useState('d-none')
  const [modalData, setModalData] = useState([])

  return (
    <Router>
      <div className="App">
        <Navbar />
        <ModalSaveData modalData={modalData} state={modalState} setModalState={setModalState}></ModalSaveData>
        <Routes>
          <Route path='/cadastrar' element={<Cadastrar setModalData={setModalData} setModalState={setModalState} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
