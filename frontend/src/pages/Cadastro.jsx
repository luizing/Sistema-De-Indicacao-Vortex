import React from "react";
import '../styles/cadastro.css'; 

const Cadastro = () => {
  
  return(
    <div className="cadastro-page">
      <div className="form-container">
        
        <h2>Crie sua conta</h2>
        <p className="subtitle">Cadastre-se para ganhar seu link de indicação!</p>

        <div className="referral-info">
          Você está se cadastrando através de um convite.
        </div>
        
        <form className="cadastro-form">
          <div className="input-group">
            <label htmlFor="nome">Nome</label>
            <input 
              type="text" 
              id="nome" 
              name="nome" 
              placeholder="Seu nome completo"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="seu.email@exemplo.com"
            />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input 
              type="password" 
              id="senha" 
              name="senha" 
              placeholder="Mínimo 8 caracteres (letras e números)"
            />
          </div>

          <button type="submit" className="submit-button">
            Cadastrar
          </button>
        </form>

        <p className="login-link">
            Já tem conta? <a href="/perfil">Faça login</a>
        </p>

      </div>
    </div>
  );
};

export default Cadastro;