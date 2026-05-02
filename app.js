// Importa los módulos necesarios para el servidor
const express = require("express");
const http = require("http");
const { engine } = require("express-handlebars");
const session = require("express-session");
const path = require("path");
const socketIo = require("socket.io");

// Importa la conexión a la base de datos
require("./config/db");

// Importa los archivos de rutas del proyecto
const rutasAuth = require("./routes/authRoutes");
const rutasProductos = require("./routes/prodRoutes");

// Crea la aplicación de Express y el servidor HTTP
const app = express();
const servidor = http.createServer(app);
const io = socketIo(servidor);

// Define el puerto donde correrá el servidor
const puerto = 3000;

// Configura el motor de plantillas Handlebars
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  }),
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Configura los middlewares globales de Express
// Permite leer datos de formularios HTML enviados con POST
app.use(express.urlencoded({ extended: true }));

// Permite leer datos en formato JSON (para Postman u otras peticiones)
app.use(express.json());

// Sirve los archivos estáticos (CSS, JS del cliente)
app.use(express.static(path.join(__dirname, "public")));

// Sirve la carpeta uploads para que las imágenes sean accesibles desde el navegador
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configura el manejo de sesiones de usuario
app.use(
  session({
    secret: "claveSecretaInventario2024",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }, // La sesión dura 1 hora
  }),
);

// Registra las rutas del proyecto en Express
app.use("/auth", rutasAuth);
app.use("/productos", rutasProductos);

// Ruta raíz: redirige según si hay sesión activa o no
app.get("/", (req, res) => {
  if (req.session && req.session.usuario) {
    res.redirect("/productos");
  } else {
    res.redirect("/auth/login");
  }
});

// Configura Socket.io para el chat en tiempo real
io.on("connection", (socket) => {
  // Registra en consola cada vez que un usuario se conecta al chat
  console.log("Usuario conectado al chat:", socket.id);

  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
  });
});

// Exporta io para usarlo en el módulo de chat del Commit 3
module.exports = { io };

// Inicia el servidor en el puerto definido
servidor.listen(puerto, () => {
  console.log("Servidor corriendo en http://localhost:" + puerto);
});
