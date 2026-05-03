// Importa el modelo de producto y el validador de formularios
const Producto = require("../models/Producto");
const { validationResult } = require("express-validator");

// Lista todos los productos almacenados en la base de datos
const listarProductos = async (req, res) => {
  try {
    // Obtiene todos los productos ordenados del más nuevo al más antiguo
    const productos = await Producto.find().sort({ createdAt: -1 });

    res.render("productos/lista", {
      productos,
      usuario: req.session.usuario,
    });
  } catch (error) {
    console.error("Error al listar productos:", error);
    res.status(500).send("Error al obtener los productos");
  }
};

// Muestra el formulario para registrar un nuevo producto
const mostrarFormNuevo = (req, res) => {
  res.render("productos/nuevo", {
    usuario: req.session.usuario,
  });
};

// Guarda el nuevo producto en la base de datos
const crearProducto = async (req, res) => {
  // Revisa si el formulario tiene errores de validación
  const errores = validationResult(req);

  // Si Multer rechazó el archivo (tipo o tamaño), lo trata como un error más
  if (!errores.isEmpty() || req.errorImagen) {
    var listaErrores = errores.array();
    if (req.errorImagen) {
      listaErrores.push({ msg: "Imagen no válida: " + req.errorImagen });
    }
    return res.render("productos/nuevo", {
      errores: listaErrores,
      datos: req.body,
      usuario: req.session.usuario,
    });
  }

  try {
    const { nombre, precio, descripcion } = req.body;

    // Si el usuario subió una imagen, guarda el nombre del archivo; si no, deja el campo vacío
    const nomImagen = req.file ? req.file.filename : "";

    await Producto.create({ nombre, precio, descripcion, imagen: nomImagen });

    res.redirect("/productos");
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).send("Error al guardar el producto");
  }
};

// Muestra el formulario de edición con los datos actuales del producto
const mostrarFormEditar = async (req, res) => {
  try {
    // Busca el producto por su ID de MongoDB
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.redirect("/productos");
    }

    res.render("productos/editar", {
      producto,
      usuario: req.session.usuario,
    });
  } catch (error) {
    console.error("Error al buscar producto para editar:", error);
    res.redirect("/productos");
  }
};

// Actualiza los datos del producto en la base de datos
const actualizarProducto = async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty() || req.errorImagen) {
    try {
      var listaErrores = errores.array();
      if (req.errorImagen) {
        listaErrores.push({ msg: "Imagen no válida: " + req.errorImagen });
      }
      const producto = await Producto.findById(req.params.id);
      return res.render("productos/editar", {
        errores: listaErrores,
        producto,
        usuario: req.session.usuario,
      });
    } catch (error) {
      return res.redirect("/productos");
    }
  }

  try {
    const { nombre, precio, descripcion } = req.body;

    // Construye el objeto con los datos a actualizar
    const datosActualizados = { nombre, precio, descripcion };

    // Solo reemplaza la imagen si el usuario subió una nueva
    if (req.file) {
      datosActualizados.imagen = req.file.filename;
    }

    // Busca el producto por ID y actualiza sus campos
    await Producto.findByIdAndUpdate(req.params.id, datosActualizados, {
      new: true,
    });

    res.redirect("/productos");
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.redirect("/productos");
  }
};

// Elimina el producto de la base de datos según su ID
const eliminarProducto = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.redirect("/productos");
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.redirect("/productos");
  }
};

// Exporta todas las funciones del controlador de productos
module.exports = {
  listarProductos,
  mostrarFormNuevo,
  crearProducto,
  mostrarFormEditar,
  actualizarProducto,
  eliminarProducto,
};
