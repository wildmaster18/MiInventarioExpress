# MiInventarioExpress

Aplicación web de gestión de productos con autenticación y chat en tiempo real.

## Datos del Estudiante

- **Nombre:** Mateo Sebastian Carranza Ortiz
- **Carrera:** Ingeniería en Software
- **Materia:** Aplicaciones Web
- **Universidad:** Universidad Politécnica Salesiana

## Funcionalidades Implementadas (Commit 2)

- Estructura de carpetas siguiendo el patrón MVC
- Servidor Express configurado y funcionando
- Conexión a MongoDB con Mongoose establecida
- Modelos de datos: Producto (nombre, precio, descripción, imagen) y Usuario
- CRUD completo de productos: crear, listar, editar y eliminar
- Carga de imágenes por producto con Multer v2.0.0 (solo JPG/PNG, máximo 2 MB)
- Autenticación de usuarios: registro, login y logout
- Contraseñas cifradas con bcrypt y sesiones con express-session
- Validación de formularios con express-validator
- Rutas protegidas con middleware de verificación de sesión
- Vistas dinámicas con Handlebars: layout principal, parciales y todas las páginas

## Tecnologías utilizadas

- Node.js + Express
- MongoDB + Mongoose
- express-handlebars
- Multer v2.0.0
- express-session + bcrypt
- express-validator
- Bootstrap 5

## Instrucciones de uso

1. Clonar el repositorio
2. Ejecutar `npm install`
3. Asegurarse de que MongoDB esté corriendo en el puerto 27017
4. Ejecutar `npm start`
5. Abrir http://localhost:3000
