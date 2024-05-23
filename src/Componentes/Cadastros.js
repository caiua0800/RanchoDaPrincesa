import './styles/Cadastros.css';
import { Navigate } from 'react-router-dom';
import React from 'react';
import Container from './Container';
import Cad from './Cad';

export default function Cadastros() {

    return (
        <div className='Cadastros'>
            <Container>
                <div className='all-cadastros'>
                    <Cad nome="Caiuã" />
                    <Cad nome="Caiuã" />
                    <Cad nome="Caiuã" />
                    <Cad nome="Caiuã" />
                    <Cad nome="Caiuã" />
                    <Cad nome="Caiuã" />
                    <Cad nome="Caiuã" />
                    <Cad nome="Caiuã" />
                    <Cad nome="Caiuã" />
                </div>

                <div className='buttons-cadastros'>
                    <button>CRIAR NOVO CADASTRO</button>
                </div>
            </Container>
        </div>
    )
}