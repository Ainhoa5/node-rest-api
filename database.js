// database.js
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10, // el número máximo de conexiones permitidas al mismo tiempo
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_rest_api'
});

module.exports = pool;
