import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CargarProductosPage = function CargarProductosPage() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState ('');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
  axios
    .post("http://localhost:3000/api/producto/",  {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      cantidad: cantidad
    })
    .then(function (response) {
      console.log('Producto actualizado:', response);
      // Aquí puedes manejar una notificación de éxito
      navigate('/inventario'); // Redirige a la página de productos
    })
    .catch(function (error) {
      console.error('Error al actualizar el producto:', error);
    });

  };

  return (
    <div className="container my-4">
      <Card className="mx-auto" style={{ maxWidth: '600px' }}>
        <Card.Header as="h5">Cargar Nuevo Producto</Card.Header>
        <Card.Body>
          <Card.Text>Ingresa los detalles del nuevo producto</Card.Text>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label>Nombre del producto</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Nombre del producto" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="descripcion">
              <Form.Label>Descripción del producto</Form.Label>
              <Form.Control 
                as="textarea" 
                placeholder="Descripción del producto" 
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="precio">
              <Form.Label>Precio</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Precio" 
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="cantidad">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Cantidad" 
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="outline-secondary" type="button" className="me-2">Cancelar</Button>
              <Button variant="primary" type="submit">Guardar Producto</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CargarProductosPage;