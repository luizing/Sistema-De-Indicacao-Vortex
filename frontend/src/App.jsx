import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import Perfil from './pages/Perfil';
import Login from './pages/Login';

const isAuthenticated = () => {
  return localStorage.getItem('token') !== null; 
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {

  return (
     <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route 
                    path="/perfil" 
                    element={
                        <ProtectedRoute>
                            <Perfil />
                        </ProtectedRoute>
                    } 
                />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
