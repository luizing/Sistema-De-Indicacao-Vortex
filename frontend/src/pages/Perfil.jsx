import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/perfil.css'; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const userId = localStorage.getItem('userId');
  
  useEffect(() => {
    if (!userId) {
        navigate('/login', { replace: true });
        return;
    }
    
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/usuarios/${userId}`);
        setUser(response.data);
      } catch (err) {
        setError('Não foi possível carregar o perfil. ID inválido ou erro de servidor.');
        console.error("Erro ao carregar perfil:", err);
        handleLogout(); 
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [userId, navigate]);

  const referralLink = user 
    ? `${window.location.origin}/cadastro?ref=${user.id}`
    : '';

  const copyLink = () => {
    if (user && referralLink) {
      navigator.clipboard.writeText(referralLink)
        .then(() => {
          alert('Link de indicação copiado para a área de transferência!');
        })
        .catch(err => {
          console.error('Falha ao copiar:', err);
          alert('Erro ao copiar o link. Tente novamente ou copie manualmente.');
        });
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login', { replace: true });
  };
  
  if (loading) {
    return (
      <div className="perfil-page">
        <div className="perfil-card loading-state">Carregando perfil...</div>
      </div>
    );
  }
  
  if (error) {
    return (
        <div className="perfil-page">
          <div className="perfil-card error-state">
            <p>{error}</p>
            <button onClick={handleLogout} className="logout-button">Ir para Login</button>
          </div>
        </div>
      );
  }

  if (!user) {
    return null; 
  }

  return (
    <div className="perfil-page">
      <div className="perfil-card">
        
        <h1 className="welcome-message">Bem-vindo(a), {user.nome}!</h1>
        
        <div className="score-box">
          <p className="score-label">Sua pontuação atual:</p>
          <span className="score-value">{user.pontuacao}</span>
          <span className="score-unit">Pontos</span>
        </div>
        
        <div className="referral-box">
          <p className="referral-label">Seu link de indicação único:</p>
          
          <div className="link-group">
            <span className="referral-link">{referralLink}</span>
            
            <button className="copy-button" onClick={copyLink}>
              Copiar Link
            </button>
          </div>
        </div>
        
        <button className="logout-button" onClick={handleLogout}>Sair da Conta</button>

      </div>
    </div>
  );
};

export default Perfil;