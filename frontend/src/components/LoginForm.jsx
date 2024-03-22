import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../axios/config'; // Importe o Axios
import image from '../img/riber_taxi_img.jpeg';
import "./LoginForm.css";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Enviar solicitação de login para o backend usando Axios
            const response = await axios.post('http://localhost:3000/login', {
                email,
                password,
            });

            // Verificar se a resposta do servidor indica sucesso
            if (response.status === 200) {
                // Se o login for bem-sucedido, redirecione para a página de dashboard
                navigate('/home');
            } else {
                // Se houver um erro durante o login, exiba uma mensagem de erro
                toast.error('Erro ao fazer login. Verifique suas credenciais.');
            }
        } catch (error) {
            // Se houver um erro de conexão ou outro erro, exiba uma mensagem de erro genérica
            toast.error('Erro ao fazer login. Por favor, tente novamente mais tarde.');
        }
    };

    return (
        <div className="login-container">
            <img src={image} alt="Riber Taxi" className="login-image" />
            <div className="login-content">
                <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Senha:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
                        </div>
                        <button type="submit" className="btn ">Entrar</button>
                    </form>
            </div>
        </div>
    );
};

export default LoginForm;
