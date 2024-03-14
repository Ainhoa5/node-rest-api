const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const productsController = require('../controllers/productControllers');

// Validación básica para el nombre y el precio
const productValidationRules = [
  body('name').trim().isLength({ min: 1 }).withMessage('El nombre del producto es obligatorio.'),
  body('price').isFloat({ gt: 0 }).withMessage('El precio debe ser un número positivo.')
];

// Middleware para manejar los errores de validación
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get('/', productsController.getProducts);
router.get('/:productId', productsController.getProductById);

// Añadir un nuevo producto
router.post('/', productValidationRules, validate, productsController.createProduct);

// Actualizar un producto existente
router.patch('/:productId', productValidationRules, validate, productsController.updateProduct);

// Eliminar un producto
router.delete('/:productId', productsController.deleteProduct);

module.exports = router;
