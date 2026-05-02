// Importa Express Router, validador, middleware de sesión, multer y el controlador
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const verificarSesion = require('../middlewares/verificarSesion');
const subirImagen = require('../config/multer');
const {
    listarProductos,
    mostrarFormNuevo,
    crearProducto,
    mostrarFormEditar,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/prodController');

// Define las reglas de validación compartidas por el formulario de crear y editar
const validarProducto = [
    body('nombre')
        .notEmpty().withMessage('El nombre del producto es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('precio')
        .notEmpty().withMessage('El precio es obligatorio')
        .isFloat({ min: 0 }).withMessage('El precio debe ser un número mayor o igual a 0')
];

// Muestra la lista de todos los productos (requiere sesión activa)
router.get('/', verificarSesion, listarProductos);

// Muestra el formulario para crear un producto nuevo
router.get('/nuevo', verificarSesion, mostrarFormNuevo);

// Procesa el formulario de creación: primero sube la imagen, luego valida y guarda
router.post('/', verificarSesion, subirImagen.single('imagen'), validarProducto, crearProducto);

// Muestra el formulario de edición con los datos del producto seleccionado
router.get('/editar/:id', verificarSesion, mostrarFormEditar);

// Procesa el formulario de edición: actualiza imagen si se subió una nueva
router.post('/editar/:id', verificarSesion, subirImagen.single('imagen'), validarProducto, actualizarProducto);

// Elimina el producto indicado por su ID
router.post('/eliminar/:id', verificarSesion, eliminarProducto);

// Exporta el router para registrarlo en app.js
module.exports = router;
