// Importa Express Router, express-validator y el controlador de autenticación
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
    mostrarLogin,
    procesarLogin,
    mostrarRegistro,
    procesarRegistro,
    cerrarSesion
} = require('../controllers/authController');

// Define las reglas de validación del formulario de login
const validarLogin = [
    body('nomUsu')
        .notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('passUsu')
        .notEmpty().withMessage('La contraseña es obligatoria')
];

// Define las reglas de validación del formulario de registro
const validarRegistro = [
    body('nomUsu')
        .notEmpty().withMessage('El nombre de usuario es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('passUsu')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

// Rutas GET: muestran las páginas de login, registro y logout
router.get('/login', mostrarLogin);
router.get('/registro', mostrarRegistro);
router.get('/logout', cerrarSesion);

// Rutas POST: procesan los formularios con sus respectivas validaciones
router.post('/login', validarLogin, procesarLogin);
router.post('/registro', validarRegistro, procesarRegistro);

// Exporta el router para registrarlo en app.js
module.exports = router;
