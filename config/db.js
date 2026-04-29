// Importa mongoose para conectarse a MongoDB
const mongoose = require('mongoose');

// Define la URL de conexión a la base de datos local
const urlBD = 'mongodb://127.0.0.1:27017/miInventarioDB';

// Establece la conexión con MongoDB usando la URL definida
mongoose.connect(urlBD)
    .then(() => {
        // Confirma en consola que la conexión fue exitosa
        console.log('Conexión a MongoDB establecida correctamente');
    })
    .catch((error) => {
        // Muestra el error si la conexión falla
        console.error('Error al conectar con MongoDB:', error);
    });

// Exporta la instancia de mongoose para usarla en otros archivos
module.exports = mongoose;
