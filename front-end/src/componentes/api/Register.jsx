import React, { useState } from 'react';
import api from './api.jsx';
import { Container, Form, Button } from 'react-bootstrap'; // Importamos los componentes de Bootstrap

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/usuarios/registrar", { username, password });
      alert('Usuario registrado con éxito');
    } catch (error) {
      alert('Error al registrar: ' + error.response.data);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Form onSubmit={handleSubmit} className="w-50">
        <h2 className="text-center mb-4">Registro</h2>

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

        <Button variant="primary" type="submit" className="w-100">Registrar</Button>
      </Form>
    </Container>
  );
};

export default Register;
