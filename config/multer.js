// Importa multer para configurar la carga de archivos
const multer = require('multer');

// Configura el almacenamiento en disco: carpeta destino y nombre del archivo
const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        // Guarda los archivos en la carpeta uploads/
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Genera un nombre único usando la fecha actual más el nombre original
        const nomUnico = Date.now() + '-' + file.originalname;
        cb(null, nomUnico);
    }
});

// Configura multer con validación de tipo MIME y tamaño máximo de archivo
const subirImagen = multer({
    storage: almacenamiento,
    fileFilter: (req, file, cb) => {
        // Solo permite imágenes en formato JPG o PNG
        const tiposPermitidos = ['image/jpeg', 'image/png'];
        if (tiposPermitidos.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes en formato JPG o PNG'));
        }
    },
    limits: {
        // Limita el tamaño del archivo a 2 megabytes como máximo
        fileSize: 2 * 1024 * 1024
    }
});

// Exporta la configuración para usarla en las rutas de productos
module.exports = subirImagen;
