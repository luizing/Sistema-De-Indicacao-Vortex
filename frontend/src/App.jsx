import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import Perfil from './pages/Perfil';
import Login from './pages/Login';

const isAuthenticated = () => {
  // Verifica se o ID do usuário está no localStorage após o login
  return localStorage.getItem('userId') !== null; 
};

// 2. Componente de Rota Protegida (ProtectedRoute)
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // Redireciona para o cadastro (ou login) se não estiver autenticado
    return <Navigate to="/cadastro" replace />;
  }
  return children;
};

function App() {

  return (
     <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
        <Route 
          path="/perfil" 
          element={
              <Perfil />
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
