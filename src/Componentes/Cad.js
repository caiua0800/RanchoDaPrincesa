import React from "react";
import './styles/Cad.css';

export default function Cad(props) {
    const { nome, sobrenome, cpf, setShowModal } = props;

    const handleClick = () => {
        setShowModal();
    };

    return (
        <div onClick={handleClick} className="Cad">
            <h2>{nome} {sobrenome}</h2>
            <h4>{cpf}</h4>
        </div>
    );
}
