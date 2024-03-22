import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../axios/config';
import image from '../img/riber_taxi_img.jpeg';
import "./RegisterForm.css";

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar se as senhas coincidem
        if (password !== confirmPassword) {
            toast.error('As senhas não coincidem!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/register', {
                email,
                password,
            });

            if (response.status === 200) {
                toast.success('Registro realizado com sucesso!');
                navigate('/home');
            } else {

                toast.error('Erro ao fazer o registro! Tente novamente!');
            }
        } catch (error) {

            toast.error('Erro ao fazer o registro!. Por favor, tente novamente mais tarde.');
        }
    };

    return (
        <div className="login-container">
            <img src={image} alt="Riber Taxi" className="login-image" />
            <div className="login-content">
                <h2>Cadastre um Email</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label>Senha:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label>Repita a senha:</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" required />
                    </div>
                    <button type="submit" className="btn ">Cadastrar</button>
                    <div className="back">
                        <Link to="/" >
                            &nbsp;Voltar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
