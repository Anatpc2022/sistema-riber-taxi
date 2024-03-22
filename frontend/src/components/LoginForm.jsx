import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../axios/config'; 
import image from '../img/riber_taxi_img.jpeg';
import "./LoginForm.css";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/login', {
                email,
                password,
            });
            if (response.status === 200) {
                navigate('/home');
            } else {
                toast.error('Erro ao fazer login. Por favor, verifique seu email e senha.');
            }
        } catch (error) {
            toast.error('Erro ao fazer login. Por favor, verifique seu email e senha.');
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
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required autoComplete="email" />
                    </div>
                    <div className="form-group">
                        <label>Senha:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
                    </div>
                    <button type="submit" className="btn ">Entrar</button>
                    <div className="register">
                            <p>Não tem uma conta?</p>
                            <Link to="/register" >
                                &nbsp;Registre-se
                            </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
