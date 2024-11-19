const express = require("express");
const bcrypt = require ('bcrypt');
const connectDB = require("./config/db");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const cors = require ("cors");
const mongoose = require ("mongoose");
const userRoutes = require ("./routes/userRoutes");
const session = require ("express-session");

//Cargar variables de entorno
require ('dotenv').config();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Cambia por el dominio de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  credentials: true, // Permitir cookies o credenciales
}));

app.use(express.json()); // Para parsear JSON en las solicitudes

//Configuracion de la sesion
app.use(session({
secret: process.env.SESSION_SECRET,
resave:false,
saveUninitialized: true,
cookie: {secure: false}
}));

// Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Definir rutas
app.use('/api/producto', require('./routes/productoRoutes'));
app.use ('/api/usuarios', userRoutes)

//agregue yo
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

