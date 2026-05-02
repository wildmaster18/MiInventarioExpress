// Verifica si existe una sesión activa antes de dar acceso a rutas protegidas
function verificarSesion(req, res, next) {
    if (req.session && req.session.usuario) {
        // Si hay sesión activa, permite continuar con la siguiente función
        next();
    } else {
        // Si no hay sesión, redirige al login
        res.redirect('/auth/login');
    }
}

// Exporta el middleware para usarlo en las rutas que requieren autenticación
module.exports = verificarSesion;
