// Importamos el módulo Express, que es un framework para Node.js que facilita la creación de aplicaciones web y API.
const express = require('express');
// Inicializamos una nueva aplicación Express.
const app = express();

// Morgan es un middleware de registro de solicitudes HTTP, útil para desarrollo y depuración.
const morgan = require('morgan');
// Body-parser es un middleware que procesa datos codificados en URL y en formato JSON en el cuerpo de las solicitudes.
const bodyParser = require('body-parser');

// Importamos las rutas definidas para productos y pedidos.
const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

// Usamos Morgan en modo 'dev' para loguear cada solicitud al servidor en la consola.
app.use(morgan('dev'));
// Usamos body-parser para analizar cuerpos de solicitud con datos codificados en URL.
app.use(bodyParser.urlencoded({extended: false}));
// Usamos body-parser para analizar cuerpos de solicitud con datos en formato JSON.
app.use(bodyParser.json());

// Configuración de headers para prevenir errores de CORS (Cross-Origin Resource Sharing).
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    // Si el método de la solicitud es OPTIONS, responde inmediatamente con los métodos HTTP permitidos.
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    // Continúa con el próximo middleware en la cadena.
    next();
})

// Middleware para manejar solicitudes a las rutas de productos y pedidos.
app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);

// Middleware para manejar errores 404 (recurso no encontrado).
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    // Pasa el error al siguiente middleware.
    next(error);
})

// Middleware para manejar cualquier otro error que ocurra durante el procesamiento de solicitudes.
app.use((error, req, res, next) => {
    // Establece el estado de la respuesta al estado del error o 500 si no está definido.
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message // Devuelve el mensaje de error en la respuesta JSON.
        }
    });
});

// Exportamos la aplicación para poder utilizarla en otros archivos, como el punto de entrada del servidor.
module.exports = app;
