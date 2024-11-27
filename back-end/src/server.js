const express = require("express");
const bcrypt = require("bcrypt");
const connectDB = require("./config/db");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const session = require("express-session");

require("dotenv").config();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

//Configuracion de la sesion
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Conexión a la base de datos
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Definir rutas
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use("/api/producto", require("./routes/productoRoutes"));
app.use("/api/usuarios", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
