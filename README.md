# Guía de API REST - Node.js REST API

Esta es una guía para interactuar con la API REST desplegada en Heroku. La URL base para todas las solicitudes es:

https://node-rest-c05751c4e227.herokuapp.com


## Endpoints Disponibles

A continuación, se describen los endpoints disponibles y cómo interactuar con ellos.

### Obtener Todos los Productos

- **GET** `/products`

  Obtén una lista de todos los productos disponibles.

  #### Ejemplo de solicitud:
    GET https://node-rest-c05751c4e227.herokuapp.com/products


### Obtener Producto por ID

- **GET** `/products/:productId`

    Obtén los detalles de un producto específico por su ID.

    #### Ejemplo de solicitud:
    GET https://node-rest-c05751c4e227.herokuapp.com/products/1
    

### Crear un Nuevo Producto

- **POST** `/products`

    Añade un nuevo producto a la base de datos.

    #### Cuerpo de la solicitud:

    ```json
    {
      "name": "Nombre del Producto",
      "price": 100.50
    }
    ```
    POST https://node-rest-c05751c4e227.herokuapp.com/products

### Actualizar un Producto

- **PATCH** `/products`

    Modifica el producto seleccionado de la base de datos basado en la ID.

    #### Cuerpo de la solicitud:

    ```json
    {
      "name": "Nuevo Nombre del Producto",
      "price": 150.75
    }

    ```
    PATCH  https://node-rest-c05751c4e227.herokuapp.com/products   

### Borrar un Producto

- **DELETE** `/products`

    Elimina el producto seleccionado de la base de datos basado en la ID.

    #### Ejemplo de solicitud:

    DELETE https://node-rest-c05751c4e227.herokuapp.com/products/1
   

## Manejo de Errores

La API devuelve errores estándar HTTP para indicar problemas con las solicitudes:

    404 Not Found: No se pudo encontrar el recurso solicitado.
    400 Bad Request: Problema con los datos enviados en la solicitud.
    500 Internal Server Error: Error interno del servidor.

Asegúrate de manejar estos errores adecuadamente en tu aplicación cliente.