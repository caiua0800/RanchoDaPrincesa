import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './styles/Login.css';
import Loading from "./Loading";

export default function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [load, setLoad] = useState('d-none');

    const handleLogin = async () => {

        setLoad('loading');
        try {
            const firestore = getFirestore();
            const auth = getAuth();

            const userDocRef = doc(firestore, 'users', username);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();

                // Verifica se o usuário é administrador
                if (userData.isAdmin) {
                    const email = userData.email;

                    // Autentica o usuário com email e senha
                    const userCredential = await signInWithEmailAndPassword(auth, email, password);
                    setIsLoggedIn(true)
                    setLoad('d-none');
                    navigate('/cadastros');
                } else {
                    setError('Usuário não é um administrador');
                }
            } else {
                setLoad('d-none');
                setError('Usuário não encontrado');
            }
        } catch (error) {
            setLoad('d-none');
            setError('Usuário ou senha incorretos');
            console.error('Erro de login:', error);
        }
    };

    return (
        <div className="Login">
            <div className="login-box">
                <h1 className="title">Sistema Pousada</h1>

                <div className="input-box">
                    <div className="input-div">
                        <label htmlFor="user">Usuário</label>
                        <input id="user" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="input-div">
                        <label htmlFor="password">Senha</label>
                        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button id="enter" onClick={handleLogin}>ENTRAR</button>
                </div>
            </div>
            <Loading load={load} />
        </div>
    );
}
