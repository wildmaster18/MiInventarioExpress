// Importa el modelo de usuario, bcrypt y el validador de formularios
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

// Muestra la página de inicio de sesión
const mostrarLogin = (req, res) => {
  // Si ya hay sesión activa, redirige directo a productos
  if (req.session && req.session.usuario) {
    return res.redirect("/productos");
  }
  res.render("auth/login", { layout: "main" });
};

// Procesa las credenciales del formulario de login
const procesarLogin = async (req, res) => {
  // Revisa si express-validator encontró errores en el formulario
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.render("auth/login", {
      errores: errores.array(),
      datos: req.body,
    });
  }

  try {
    const { nomUsu, passUsu } = req.body;

    // Busca en la base de datos un usuario con ese nombre
    const usuarioEncontrado = await Usuario.findOne({ nomUsu });

    if (!usuarioEncontrado) {
      // No existe el usuario: se envía mensaje de error genérico por seguridad
      return res.render("auth/login", {
        error: "Usuario o contraseña incorrectos",
        datos: req.body,
      });
    }

    // Compara la contraseña ingresada con el hash guardado en MongoDB
    const passCorrecta = await bcrypt.compare(
      passUsu,
      usuarioEncontrado.passUsu,
    );

    if (!passCorrecta) {
      return res.render("auth/login", {
        error: "Usuario o contraseña incorrectos",
        datos: req.body,
      });
    }

    // Guarda los datos del usuario en la sesión para identificarlo en otras páginas
    req.session.usuario = {
      id: usuarioEncontrado._id,
      nomUsu: usuarioEncontrado.nomUsu,
    };

    res.redirect("/productos");
  } catch (error) {
    console.error("Error al procesar el login:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Muestra el formulario de registro de nuevo usuario
const mostrarRegistro = (req, res) => {
  if (req.session && req.session.usuario) {
    return res.redirect("/productos");
  }
  res.render("auth/registro", { layout: "main" });
};

// Guarda un nuevo usuario en la base de datos con contraseña cifrada
const procesarRegistro = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.render("auth/registro", {
      errores: errores.array(),
      datos: req.body,
    });
  }

  try {
    const { nomUsu, passUsu } = req.body;

    // Verifica si el nombre de usuario ya está registrado
    const usuarioExiste = await Usuario.findOne({ nomUsu });
    if (usuarioExiste) {
      return res.render("auth/registro", {
        error: "Ese nombre de usuario ya está en uso",
        datos: req.body,
      });
    }

    // Cifra la contraseña con bcrypt antes de guardarla (10 = nivel de seguridad)
    const passHasheada = await bcrypt.hash(passUsu, 10);

    // Crea el usuario nuevo en MongoDB con la contraseña ya cifrada
    await Usuario.create({ nomUsu, passUsu: passHasheada });

    // Redirige al login para que el usuario inicie sesión con sus datos
    res.redirect("/auth/login");
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Destruye la sesión activa y redirige al login
const cerrarSesion = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
};

// Exporta todas las funciones del controlador de autenticación
module.exports = {
  mostrarLogin,
  procesarLogin,
  mostrarRegistro,
  procesarRegistro,
  cerrarSesion,
};
