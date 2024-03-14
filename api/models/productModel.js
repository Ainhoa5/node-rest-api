// api/models/productModel.js
const pool = require('../../config/database');

const findAll = (callback) => {
    pool.query('SELECT * FROM products', callback);
};

const findById = (id, callback) => {
    pool.query('SELECT * FROM products WHERE id = ?', [id], callback);
};

const create = ({ name, price }, callback) => {
    pool.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price], callback);
};

const update = (id, { name, price }, callback) => {
    pool.query('UPDATE products SET name = ?, price = ? WHERE id = ?', [name, price, id], callback);
};

const deleteProduct = (id, callback) => {
    pool.query('DELETE FROM products WHERE id = ?', [id], callback);
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    delete: deleteProduct
};
