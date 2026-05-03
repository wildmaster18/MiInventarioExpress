// Establece la conexión con el servidor Socket.io
var socket = io();

// Obtiene referencias a los elementos del DOM que se usarán
var cajaMensajes = document.getElementById("cajaMensajes");
var inpMensaje = document.getElementById("inpMensaje");
var btnEnviar = document.getElementById("btnEnviar");
var etiqConexion = document.getElementById("estadoConexion");

// Al conectarse, envía el nombre del usuario al servidor
socket.on("connect", function () {
  socket.emit("usuarioConectado", nomUsuActual);

  // Actualiza el indicador visual de conexión
  etiqConexion.className = "badge bg-success";
  etiqConexion.innerHTML =
    '<i class="bi bi-circle-fill me-1" style="font-size:0.6rem;"></i>Conectado';
});

// Si se pierde la conexión, actualiza el indicador a rojo
socket.on("disconnect", function () {
  etiqConexion.className = "badge bg-danger";
  etiqConexion.innerHTML =
    '<i class="bi bi-circle-fill me-1" style="font-size:0.6rem;"></i>Desconectado';
});

// Recibe un mensaje del servidor y lo muestra en pantalla
socket.on("chatMensaje", function (datos) {
  // Determina si el mensaje es propio para aplicar el estilo correcto
  var esPropio = datos.nomUsu === nomUsuActual;

  var contenedor = document.createElement("div");
  contenedor.classList.add("mb-2", "limpiarFloat");

  // Crea la burbuja del mensaje usando createElement para evitar XSS
  var burbujaDiv = document.createElement("div");
  burbujaDiv.classList.add(
    "burbujaMensaje",
    esPropio ? "burbujaPropia" : "burbujaOtro",
  );

  // Elemento para la hora del mensaje
  var horaElem = document.createElement("small");
  horaElem.classList.add("text-muted", "d-block");
  if (esPropio) {
    horaElem.classList.add("text-end");
  }
  horaElem.textContent = datos.hora;

  // Elemento para el nombre del autor del mensaje
  var autorElem = document.createElement("span");
  autorElem.classList.add("fw-semibold");
  if (!esPropio) {
    autorElem.classList.add("text-primary");
  }
  autorElem.textContent = esPropio ? "Tú: " : datos.nomUsu + ": ";

  // Elemento para el contenido del mensaje (textContent evita ejecución de HTML malicioso)
  var textoElem = document.createElement("span");
  textoElem.textContent = datos.mensaje;

  burbujaDiv.appendChild(horaElem);
  burbujaDiv.appendChild(autorElem);
  burbujaDiv.appendChild(textoElem);
  contenedor.appendChild(burbujaDiv);

  cajaMensajes.appendChild(contenedor);

  // Desplaza la vista hacia el último mensaje recibido
  cajaMensajes.scrollTop = cajaMensajes.scrollHeight;
});

// Recibe mensajes del sistema (usuario entró o salió del chat)
socket.on("mensajeSistema", function (texto) {
  var linea = document.createElement("p");
  linea.classList.add(
    "text-center",
    "text-muted",
    "small",
    "my-2",
    "fst-italic",
  );
  linea.textContent = "\u2014 " + texto + " \u2014";
  cajaMensajes.appendChild(linea);
  cajaMensajes.scrollTop = cajaMensajes.scrollHeight;
});

// Envía el mensaje al hacer clic en el botón
btnEnviar.addEventListener("click", function () {
  enviarMensaje();
});

// Envía el mensaje al presionar la tecla Enter en el campo de texto
inpMensaje.addEventListener("keypress", function (evento) {
  if (evento.key === "Enter") {
    enviarMensaje();
  }
});

// Valida que el campo no esté vacío y emite el mensaje al servidor
function enviarMensaje() {
  var mensaje = inpMensaje.value.trim();

  // No envía si el campo está vacío
  if (mensaje === "") {
    return;
  }

  // Emite el evento chatMensaje con el texto al servidor
  socket.emit("chatMensaje", mensaje);

  // Limpia el campo y devuelve el foco para el siguiente mensaje
  inpMensaje.value = "";
  inpMensaje.focus();
}
