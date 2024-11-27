import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from './api';
import { useAuth } from './authcontext'; 
import { Container, Form, Button } from 'react-bootstrap'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/usuarios/login", { username, password })
      .then(function (response) {
        navigate('/cargar'); // Redirige a la ruta protegida
        login(); 
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
      });
      
    } catch (error) {
      alert('Error en el inicio de sesión: ' + error.response.data);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Form onSubmit={handleSubmit} className="w-50">
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Introduce tu nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Introduce tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">Iniciar Sesión</Button>
      </Form>
    </Container>
  );
};

export default Login;
