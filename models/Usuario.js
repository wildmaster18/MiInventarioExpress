// Importa mongoose para definir el esquema del usuario
const mongoose = require('mongoose');

// Define la estructura que tendrán los documentos de usuarios en MongoDB
const esquemaUsuario = new mongoose.Schema(
    {
        nomUsu: {
            type: String,
            required: [true, 'El nombre de usuario es obligatorio'],
            unique: true,
            trim: true
        },
        passUsu: {
            // Almacena la contraseña ya cifrada con bcrypt, nunca en texto plano
            type: String,
            required: [true, 'La contraseña es obligatoria']
        }
    },
    {
        timestamps: true
    }
);

// Exporta el modelo para usarlo en los controladores
module.exports = mongoose.model('Usuario', esquemaUsuario);
