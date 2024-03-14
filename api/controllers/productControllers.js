// api/controllers/productControllers.js
const ProductModel = require('../models/productModel');

const getProducts = (req, res, next) => {
    ProductModel.findAll((error, results) => {
        if (error) {
            return next(error);
        }
        res.json(results);
    });
};

const getProductById = (req, res, next) => {
    const { productId } = req.params;
    ProductModel.findById(productId, (error, results) => {
        if (error) {
            return next(error);
        }
        res.json(results.length ? results[0] : {});
    });
};

const createProduct = (req, res, next) => {
    const { name, price } = req.body;
    ProductModel.create({ name, price }, (error, results) => {
        if (error) {
            return next(error);
        }
        res.status(201).json({ message: 'Producto creado', createdProduct: { id: results.insertId, name, price } });
    });
};

const updateProduct = (req, res, next) => {
    const { productId } = req.params;
    const { name, price } = req.body;
    ProductModel.update(productId, { name, price }, (error, results) => {
        if (error) {
            return next(error);
        }
        res.status(200).json({ message: 'Producto actualizado', productId });
    });
};

const deleteProduct = (req, res, next) => {
    const { productId } = req.params;
    ProductModel.delete(productId, (error, results) => {
        if (error) {
            return next(error);
        }
        res.status(200).json({ message: 'Producto eliminado', productId });
    });
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
