# MiInventarioExpress

Aplicación web de gestión de productos con autenticación y chat en tiempo real.

## Datos del Estudiante

- **Nombre:** Mateo Sebastian Carranza Ortiz
- **Carrera:** Ingeniería en Software
- **Materia:** Aplicaciones Web
- **Universidad:** Universidad Politécnica Salesiana

## Funcionalidades Implementadas

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
- Chat en tiempo real entre usuarios autenticados con Socket.io
- Manejo de errores global con middleware de Express

## Tecnologías utilizadas

- Node.js + Express
- MongoDB + Mongoose
- express-handlebars
- Multer v2.0.0
- express-session + bcrypt
- express-validator
- Socket.io
- Bootstrap 5

## Instrucciones de uso

1. Clonar el repositorio
2. Ejecutar `npm install`
3. Asegurarse de que MongoDB esté corriendo en el puerto 27017
4. Ejecutar `npm start`
5. Abrir http://localhost:3000

## Pruebas con Postman

| Método | URL                       | Descripción                 |
| ------ | ------------------------- | --------------------------- |
| GET    | `/auth/login`             | Página de inicio de sesión  |
| POST   | `/auth/login`             | Procesa las credenciales    |
| GET    | `/auth/registro`          | Página de registro          |
| POST   | `/auth/registro`          | Crea un nuevo usuario       |
| GET    | `/auth/logout`            | Cierra la sesión activa     |
| GET    | `/productos`              | Lista todos los productos   |
| POST   | `/productos`              | Crea un nuevo producto      |
| GET    | `/productos/editar/:id`   | Formulario de edición       |
| POST   | `/productos/editar/:id`   | Actualiza el producto       |
| POST   | `/productos/eliminar/:id` | Elimina el producto         |
| GET    | `/chat`                   | Sala de chat en tiempo real |

## Estructura del proyecto

```
MiInventarioExpress/
├── config/          ← Conexión a MongoDB y configuración de Multer
├── controllers/     ← Lógica de negocio (auth y productos)
├── middlewares/     ← Verificación de sesión activa
├── models/          ← Esquemas Mongoose (Producto y Usuario)
├── routes/          ← Rutas Express (auth, productos, chat)
├── views/           ← Plantillas Handlebars
├── public/          ← CSS y JavaScript del cliente
├── uploads/         ← Imágenes subidas por usuarios
├── app.js           ← Punto de entrada del servidor
└── package.json     ← Dependencias del proyecto
```
