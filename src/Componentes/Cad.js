import React from "react";
import './styles/Cad.css'

export default function Cad(props){
    const { nome } = props;
    return (
        <div className="Cad">
            {nome}
        </div>
    )
}