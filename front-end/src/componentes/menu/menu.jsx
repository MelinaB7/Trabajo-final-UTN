import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useAuth } from "../api/authcontext";

const Menu = () => {
  const { isAuthenticated, logout } = useAuth(); // Obtenemos el estado de autenticación

  const handleLogout = () => {
    logout();
    alert("Sesión cerrada");
  };

  return (
    <Navbar bg="black" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" className="text-white">
          Sistema de Inventario
        </Navbar.Brand>
        <Nav className="ms-auto">
          {/* Enlaces visibles solo cuando el usuario no está autenticado */}
          {!isAuthenticated && (
            <>
              <Nav.Link as={Link} to="/registrarse" className="text-white">
              <Button variant="primary">Registro</Button>
              </Nav.Link>
              <Nav.Link as={Link} to="/login" className="text-white">
                <Button variant="primary">Iniciar sesión</Button>
              </Nav.Link>
            </>
          )}

          {/* Botones que solo aparecen cuando el usuario está autenticado */}
          {isAuthenticated && (
            <>
              <Nav.Link as={Link} to="/cargar" className="text-white">
              <Button variant="primary">Cargar Producto</Button>
              </Nav.Link>
              <Nav.Link as={Link} to="/inventario" className="text-white">
              <Button variant="primary">Inventario</Button>
              </Nav.Link>
              <Nav.Link onClick={handleLogout} className="text-white">
                <Button variant="danger">Cerrar sesión</Button>
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Menu;
