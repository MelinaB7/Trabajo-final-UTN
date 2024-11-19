# Trabajo-final-UTN
# Gestor de inventario

Este proyecto es una aplicación web para una gestion de inventario, desarrollada utilizando React para el frontend y Node.js con Express para el backend. La aplicación permite realizar operaciones CRUD sobre los diferentes productos, utilizando MongoDB como base de datos.

# Tecnologías Utilizadas

- **Frontend**: React, React Router, Bootstrap
- **Backend**: Node.js, Express
- **Base de Datos**: MongoDB, Mongoose

# Estructura del Proyecto

- **Frontend**: Código fuente en el directorio `front-end/`
- **Backend**: Código fuente en el directorio `back-end/`


## Funcionalidades

- **Registrarse **: Permite crear un nuevo usuario y lo guarda en la base de datos.
- **Login**: Verifica que el username y password existan y sean correctos y da acceso a las rutas protegidas (Cargar Productos e Inventario).
- **Cerrar Sesion**: Cierra la sesion de un usuario que habia iniciado.
- **Cargar Productos**: Añade un nuevo producto a la base de datos.
- **Inventario**: Visualiza todos los productos disponibles.
- **Editar Producto**: Modifica los detalles de un producto existente.
- **Eliminar Producto**: Elimina un producto de la base de datos.

## Endpoints del API
- Usuario

- `POST /api/usuarios/registrar` - Crea un nuevo usuario.
- `POST /api/usuarios/login`- Inicia la sesion.
- `GET /api/usuarios/logout` - Cierra la sesion.
- `GET /api/usuarios/protegida` - Da acceso a las rutas rotegidas.

- Productos
- `GET /api/producto/` - Obtiene todos los productos.
- `POST /api/producto/`- Crea un nuevo producto.
- `PUT /api/producto/:id` - Edita un producto por ID.
- `DELETE /api/producto/:id` - Elimina un producto por ID.
