const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/registrar', userController.registrarUsuario);
router.post('/login', userController.iniciarSesion);
router.get('/logout', userController.cerrarSesion);
router.get('/protegida', userController.rutaProtegida);

module.exports = router;
