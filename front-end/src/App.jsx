import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './componentes/api/authcontext';
import LoginPage from "./componentes/api/login";
import CargarProductosPage from './componentes/cargaProductos/cargaProductos';
import ProductosPage from './componentes/inventario/inventario';
import Inicio from './componentes/inicio/inicio';
import Register from './componentes/api/register';
import Menu from './componentes/menu/menu';
import ProtectedRoute from './componentes/api/ProtectedRoute';
function App() {
  const [count, setCount] = useState(0)

  return (

    <AuthProvider>
    <Router>
    <Menu />
        <Routes>          
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registrarse" element={<Register />} />
          <Route
            path="/cargar"
            element={<ProtectedRoute element={<CargarProductosPage />} />}
          />
          <Route
            path="/inventario"
            element={<ProtectedRoute element={<ProductosPage />} />}
          />

        </Routes>
  
    </Router>

    </AuthProvider>
  );
}

export default App;