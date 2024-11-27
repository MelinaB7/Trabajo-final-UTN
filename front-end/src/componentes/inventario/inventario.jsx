import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductosPage = function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productoActual, setProductoActual] = useState(null);
  const [imagen, setImagen] = useState(null);

  useEffect(() => {
    handleCargarProductos();
  }, []);

  const handleCargarProductos = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/producto")
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching productos:", error);
      });
  };

  const handleEliminar = (id) => {
    axios
      .delete(process.env.REACT_APP_API_URL + "/api/producto/" + id,)
      .then(function (response) {
      
        console.log(response);
      })
      .catch(function (error) {
 
        console.log(error);
      })
      .finally(function () {
        handleCargarProductos();
      });
  };
  //edita un producto
  const handleEditar = (producto) => {
    setProductoActual(producto);
    setShowModal(true);
  };

  const handleGuardarCambios = () => {
    if (productoActual) {
      const formData = new FormData(); 
      formData.append("nombre", productoActual.nombre);
      formData.append("descripcion", productoActual.descripcion);
      formData.append("precio", productoActual.precio);
      formData.append("cantidad", productoActual.cantidad);
      if (imagen) formData.append("imagen", imagen); 

      axios
        .put(process.env.REACT_APP_API_URL + "/api/producto/" + productoActual._id, formData, {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          handleCargarProductos();
        });
    }
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductoActual((prev) => ({
      ...prev,
      [name]: name === "precio" ? parseFloat(value) : value,
    }));
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Productos Cargados</h1>
      <div className="row">
        {productos.map((producto) => (
          <div className="col-md-6 col-lg-4 mb-4" key={producto.id}>
            <Card className="h-100">
            {producto.imagen && (
              <Card.Img
                variant="top"
                src={process.env.REACT_APP_API_URL + `/uploads/${producto.imagen}`}
                alt={producto.nombre}
                style={{ height: "200px", objectFit: "cover" }}
              />
            )}
              <Card.Header as="h5">{producto.nombre}</Card.Header>
              <Card.Body>
                <Card.Text>{producto.descripcion}</Card.Text>
                <Card.Text className="fw-bold fs-4">
                  ${producto.precio.toFixed(2)}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="warning"
                    onClick={() => handleEditar(producto)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleEliminar(producto._id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Link to="/cargar">
          <Button variant="success">Cargar Nuevo Producto</Button>
        </Link>
      </div>

      {/* Modal para editar producto */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del producto</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={productoActual?.nombre || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={productoActual?.descripcion || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={productoActual?.precio || ""}
                onChange={handleChange}
                step="0.01"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Imagen del producto</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImagen(e.target.files[0])} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardarCambios}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductosPage;
