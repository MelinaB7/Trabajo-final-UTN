import { useState } from 'react';
import { Button, Carousel, Container, Form, Navbar, Nav, Row, Col } from 'react-bootstrap';
import imagen1 from '../../assets/imagenes/imagen2.png';
import imagen2 from '../../assets/imagenes/imagen4.png';
import imagen3 from '../../assets/imagenes/imagen1.png';

const Inicio = function Inicio() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', { email, message });
  };

  return (
    <>

      <Carousel className="my-4">
        <Carousel.Item>
          <img src={imagen1} className="d-block w-100" alt="Slide 1" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={imagen2} className="d-block w-100" alt="Slide 2" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={imagen3} className="d-block w-100" alt="Slide 3" />
        </Carousel.Item>
      </Carousel>

      <Container className="my-5">
      <Row className="justify-content-center">
      <Col md={6}> 
        <h2 className="text-center mb-4">Contáctanos</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="message">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary">Enviar</Button>
        </Form>
        </Col>
        </Row>
      </Container>

      <footer className="bg-light text-center text-lg-start mt-5">
        <Container fluid className="p-4">
          <Row>
            <Col lg={6} md={12} className="mb-4 mb-md-0">
              <h5 className="text-uppercase">Sistema de Inventario</h5>
              <p>Somos una empresa dedicada a ofrecer el mejor sistema de inventarios para nuestros clientes.</p>
            </Col>
            <Col lg={3} md={6} className="mb-4 mb-md-0">
              <h5 className="text-uppercase">Contacto</h5>
              <ul className="list-unstyled">
                <li><a href="#!" className="text-dark">info@miempresa.com</a></li>
                <li><a href="#!" className="text-dark">+54 351 777 3839</a></li>
              </ul>
            </Col>
          </Row>
        </Container>
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2024 Sistema de Inventarios. Todos los derechos reservados.
        </div>
      </footer>
    </>
  );
}

export default Inicio; 