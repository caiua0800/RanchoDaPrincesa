import React, { useState } from "react";
import './styles/Cadastrar.css'
import Container from './Container'
import { Navigate } from 'react-router-dom';

export default function Cadastrar({ setModalState, setModalData }) {


    const [values, setValues] = useState({
        nome: '',
        sobrenome: '',
        cpf: '',
        birth: '',
        adress: '',
        bairro: '',
        cep: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSave = () => {
        setModalData(values);
        setModalState('ModalSaveData')
    }


    return (
        <div className="Cadastrar">


            <Container>
                <div className="formulario">
                    <div className="client-input-box">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" id="nome" name="nome" value={values.nome} onChange={handleChange} />
                    </div>
                    <div className="client-input-box">
                        <label htmlFor="sobrenome">Sobrenome</label>
                        <input type="text" id="sobrenome" name="sobrenome" value={values.sobrenome} onChange={handleChange} />
                    </div>
                    <div className="client-input-box">
                        <label htmlFor="cpf">CPF</label>
                        <input type="text" id="cpf" name="cpf" value={values.cpf} onChange={handleChange} />
                    </div>
                    <div className="client-input-box">
                        <label htmlFor="birth">Data de Nascimento</label>
                        <input className="data-de-nascimento" type="date" id="birth" name="birth" value={values.birth} onChange={handleChange} />
                    </div>
                    <div className="client-input-box">
                        <label htmlFor="adress">Endereço</label>
                        <input type="text" id="adress" name="adress" value={values.adress} onChange={handleChange} />
                    </div>
                    <div className="client-input-box">
                        <label htmlFor="bairro">Bairro</label>
                        <input type="text" id="bairro" name="bairro" value={values.bairro} onChange={handleChange} />
                    </div>
                    <div className="client-input-box">
                        <label htmlFor="cep">CEP</label>
                        <input type="text" id="cep" name="cep" value={values.cep} onChange={handleChange} />
                    </div>
                    <button onClick={handleSave}>SALVAR</button>
                </div>

            </Container>
        </div>
    )
}
