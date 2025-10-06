import React from 'react';
import '../styles/perfil.css'; 

const mockUser = {
  nome: 'Nome do Usuário',
  pontuacao: 15,
  id: 101 
};

const Perfil = () => {
  const { nome, pontuacao, id } = mockUser;
  
  const mockReferralLink = `http://localhost:5173/cadastro?ref=${id}`;

  return (
    <div className="perfil-page">
      <div className="perfil-card">
        
        <h1 className="welcome-message">Bem-vindo(a), {nome}!</h1>
        
        <div className="score-box">
          <p className="score-label">Sua pontuação atual:</p>
          <span className="score-value">{pontuacao}</span>
          <span className="score-unit">Pontos</span>
        </div>
        
        <div className="referral-box">
          <p className="referral-label">Seu link de indicação único:</p>
          
          <div className="link-group">
            <span className="referral-link">{mockReferralLink}</span>

            <button className="copy-button">
              Copiar Link
            </button>
          </div>
        </div>
        
        <button className="logout-button">Sair da Conta</button>

      </div>
    </div>
  );
};

export default Perfil;