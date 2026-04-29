// Importa los módulos necesarios para el servidor
const express = require("express");
const http = require("http");
const { engine } = require("express-handlebars");
const session = require("express-session");
const path = require("path");
const socketIo = require("socket.io");

// Importa la conexión a la base de datos
require("./config/db");

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
  }),
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Configura los middlewares de Express

// Permite leer datos de formularios HTML enviados con POST
app.use(express.urlencoded({ extended: true }));

// Permite leer datos en formato JSON
app.use(express.json());

// Sirve los archivos estáticos (CSS, JS del cliente, imágenes)
app.use(express.static(path.join(__dirname, "public")));

// Sirve la carpeta de uploads para que las imágenes sean accesibles desde el navegador
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

// Ruta de prueba para verificar que el servidor funciona
app.get("/", (req, res) => {
  res.send(
    "<h1>MiInventarioExpress funcionando correctamente</h1><p>Servidor listo en el puerto " +
      puerto +
      "</p>",
  );
});

// Configura Socket.io para el chat en tiempo real
io.on("connection", (socket) => {
  // Registra en consola cada vez que un usuario se conecta
  console.log("Usuario conectado al chat:", socket.id);

  socket.on("disconnect", () => {
    // Registra en consola cuando un usuario se desconecta
    console.log("Usuario desconectado:", socket.id);
  });
});

// Inicia el servidor en el puerto definido
servidor.listen(puerto, () => {
  console.log("Servidor corriendo en http://localhost:" + puerto);
});
