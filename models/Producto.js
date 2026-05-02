// Importa mongoose para definir el esquema del producto
const mongoose = require('mongoose');

// Define la estructura que tendrán los documentos de productos en MongoDB
const esquemaProducto = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre del producto es obligatorio'],
            trim: true
        },
        precio: {
            type: Number,
            required: [true, 'El precio es obligatorio'],
            min: [0, 'El precio no puede ser negativo']
        },
        descripcion: {
            type: String,
            trim: true,
            default: ''
        },
        imagen: {
            type: String,
            default: ''
        }
    },
    {
        // Agrega automáticamente los campos createdAt y updatedAt
        timestamps: true
    }
);

// Exporta el modelo para usarlo en los controladores
module.exports = mongoose.model('Producto', esquemaProducto);
