import React from "react";
import { useNavigate } from "react-router-dom";
import './styles/Login.css';

export default function Login() {
    const navigate = useNavigate();

    const handleEnterClick = () => {
        navigate('/rancho');
    };

    return (
        <div className="Login">
            <div className="login-box">
                <h1 className="title">Sistema Pousada</h1>

                <div className="input-box">
                    <div className="input-div">
                        <label htmlFor="user">Usuário</label>
                        <input id="user" />
                    </div>
                    <div className="input-div">
                        <label htmlFor="password">Senha</label>
                        <input id="password" type="password" />
                    </div>

                    <button id="enter" onClick={handleEnterClick}>ENTRAR</button>
                </div>
            </div>
        </div>
    );
}
