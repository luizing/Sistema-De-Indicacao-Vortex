import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import Perfil from './pages/Perfil';

function App() {

  return (
     <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
        <Route 
          path="/perfil" 
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/cadastro" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
