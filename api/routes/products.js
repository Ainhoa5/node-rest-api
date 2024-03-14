const express = require('express');
const router = express.Router();
const pool = require('../../database');

router.get('/', (req, res, next) => {
    pool.query('SELECT * FROM products', (error, results, fields) => {
        if (error) throw error;
        res.status(200).json(results);
    });
});

router.post('/', (req, res, next) => {
    const { name, price } = req.body;
    pool.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price], (error, results, fields) => {
        if (error) throw error;
        res.status(201).json({
            message: 'Producto creado',
            createdProduct: { id: results.insertId, name, price }
        });
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    pool.query('SELECT * FROM products WHERE id = ?', [id], (error, results, fields) => {
        if (error) {
            throw error;
        }
        // Si no se encuentra el producto, devuelve un mensaje de error
        if (results.length === 0) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            });
        }
        // Devuelve el producto encontrado
        res.status(200).json(results[0]);
    });
});


router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const { name, price } = req.body;
    pool.query(
        'UPDATE products SET name = ?, price = ? WHERE id = ?',
        [name, price, id],
        (error, results, fields) => {
            if (error) throw error;
            res.status(200).json({
                message: 'Producto actualizado',
                productId: id
            });
        }
    );
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    pool.query('DELETE FROM products WHERE id = ?', [id], (error, results, fields) => {
        if (error) throw error;
        res.status(200).json({
            message: 'Producto eliminado',
            productId: id
        });
    });
});



module.exports = router;
