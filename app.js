const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

// rutas para los productos y pedidos
const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

app.use(morgan('dev')); // registro de solicitudes HTTP en la consola
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Headers para el acceso de los clientes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS');
    
})

// Routes that handle requests
app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);

// Middleware para manejar errores 404
// Se activa si ninguna ruta coincide con la solicitud.
app.use((req, res, next) =>{
    const error = new Error('Not found');
    error.status = 404;
    next(error); // Pasa el error al siguiente middleware
})

// Middleware para manejar cualquier error que ocurra durante el procesamiento de las solicitudes.
// captura errores de cualquier middleware anterior (incluidos los de arriba).
app.use((error, req, res, next) => {
    res.status(error.status || 500); // Devuelve un estado HTTP del error o 500 si el estado no está definido
    res.json({
        error: {
            message: error.message // Muestra el mensaje de error
        }
    })
});

// Exportamos la aplicación (servidor Express) para poder usarla desde otros archivos
module.exports = app;