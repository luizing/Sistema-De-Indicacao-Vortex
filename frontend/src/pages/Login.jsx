import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css'; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [formData, setFormData] = useState({ email: '', senha: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
    setError(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.senha) {
        setError('Por favor, preencha todos os campos.');
        return;
    }
    
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/usuarios/login`, formData);
      
      const user = response.data;
      
      localStorage.setItem('userId', user.id); 
      localStorage.setItem('token', user.token);
      
      navigate('/perfil'); 

    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('E-mail ou senha inválidos.');
      } else {
        setError('Erro ao conectar com o servidor. Tente novamente mais tarde.');
      }
      console.error('Erro de Login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="form-container">
        
        <h2>Fazer Login</h2>
        <p className="subtitle">Acesse sua conta para ver sua pontuação.</p>

        {error && <p className="error-message api-error">{error}</p>}
        
        <form className="login-form" onSubmit={handleSubmit}>

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
              placeholder="Sua senha secreta"
              value={formData.senha}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="cadastro-link">
            Não tem conta? <a href="/cadastro">Cadastre-se aqui</a>
        </p>

      </div>
    </div>
  );
};

export default Login;