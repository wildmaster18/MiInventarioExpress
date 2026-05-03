// Importa Express Router y el middleware de sesión
const express = require('express');
const router = express.Router();
const verificarSesion = require('../middlewares/verificarSesion');

// Muestra la sala de chat solo a usuarios con sesión activa
router.get('/', verificarSesion, (req, res) => {
    res.render('chat/sala', {
        usuario: req.session.usuario
    });
});

// Exporta el router para registrarlo en app.js
module.exports = router;
