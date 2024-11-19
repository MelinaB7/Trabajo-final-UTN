const bcrypt = require('bcrypt');
const User = require('../models/user');


// Registrar un nuevo usuario
exports.registrarUsuario = async (req, res) => {
    const { username, password } = req.body;

    // Verificar que se haya recibido la contraseña
    if (!password) {
        return res.status(400).send('La contraseña es requerida');
    }

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('El usuario ya existe');
        }

        // Definir el factor de sal con un valor por defecto
        const saltRounds = parseInt(process.env.SALT) || 10;

        // Verificar que saltRounds sea un número válido
        if (isNaN(saltRounds)) {
            return res.status(500).send('Valor de SALT inválido en el archivo .env');
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Crear y guardar el nuevo usuario
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        console.log('Usuario registrado:', newUser);
        res.status(201).send('Usuario registrado con éxito');
    } catch (err) {
        console.error('Error al registrar el usuario:', err);
        res.status(500).send('Error en el servidor');
    }
};


// Iniciar sesión
exports.iniciarSesion = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send('usuario no encontrado');
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            console.error('Contraseña incorrecta para el usuario:', username);
            return res.status(401).send('Contraseña incorrecta');
        }
        req.session.user = user.username;
        res.send(`Usuario ${user.username} ha iniciado sesión`);
    } catch (err) {
        console.error('Error en el servidor:', err);
        res.status(500).send('Error en el servidor');
    }
};

// Cerrar sesión
exports.cerrarSesion = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión');
        }
        res.send('Sesión cerrada');
    });
};

// Ruta protegida
exports.rutaProtegida = (req, res) => {
    if (req.session.user) {
        res.send(`Bienvenido, ${req.session.user}`);
    } else {
        res.status(401).send('No autorizado');
    }
};
