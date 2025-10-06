import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import '../styles/cadastro.css'; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const Cadastro = () => {

  const [formData, setFormData] = useState({ 
    nome: '', 
    email: '', 
    senha: '' 
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const idReferencia = searchParams.get('ref');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
    setErrors({
      ...errors,
      [e.target.name]: null
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.nome) {
        newErrors.nome = 'O nome é obrigatório.';
    }
    
    if (!EMAIL_REGEX.test(formData.email)) {
        newErrors.email = 'O e-mail precisa ter um formato válido.';
    }

    if (!PASSWORD_REGEX.test(formData.senha)) {
        newErrors.senha = 'Mínimo 8 caracteres, contendo letras e números.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validate()) {
      return; 
    }
    
    setLoading(true);

    const payload = {
      ...formData,
      idReferencia: idReferencia ? Number(idReferencia) : null,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/api/usuarios/cadastro`, payload);
      
      const { id, token } = response.data; 
      localStorage.setItem('userId', id); 
      localStorage.setItem('token', token);
      
      alert('Cadastro realizado com sucesso! Você ganhou acesso ao seu perfil.');
      navigate('/perfil'); 

    } catch (error) {
      if (error.response && error.response.data) {
        setApiError(error.response.data.message || error.response.data);
      } else {
        setApiError('Não foi possível conectar ao servidor da API. Verifique se o backend está rodando.');
      }
      console.error('Erro de Cadastro:', error);
    } finally {
      setLoading(false);
    }
  };


    return(
    <div className="cadastro-page">
      <div className="form-container">
        
        <h2>Crie sua conta</h2>
        <p className="subtitle">Cadastre-se para ganhar seu link de indicação!</p>

        {idReferencia && (
            <div className="referral-info">
                Você está se cadastrando através de um convite.
            </div>
        )}
        
        <form className="cadastro-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="nome">Nome</label>
            <input 
              type="text" 
              id="nome" 
              name="nome" 
              placeholder="Seu nome completo"
              value={formData.nome}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="seu.email@exemplo.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input 
              type="password" 
              id="senha" 
              name="senha" 
              placeholder="Mínimo 8 caracteres (letras e números)"
              value={formData.senha}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-button">
            Cadastrar
          </button>
        </form>

        <p className="login-link">
            Já tem conta? <a href="/login">Faça login</a>
        </p>

      </div>
    </div>
  );
};

export default Cadastro;