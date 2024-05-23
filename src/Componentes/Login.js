import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './styles/Login.css';

export default function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const firestore = getFirestore();
            const auth = getAuth();

            // Obtém o documento do Firestore com base no nome de usuário fornecido
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
                    navigate('/cadastros');
                } else {
                    setError('Usuário não é um administrador');
                }
            } else {
                setError('Usuário não encontrado');
            }
        } catch (error) {
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
        </div>
    );
}
