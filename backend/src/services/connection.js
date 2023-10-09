const mysql = require('mysql2/promise');

require('dotenv').config();

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    port: process.env.MYSQL_PORT,
});

connection.getConnection()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch(error => {
        console.error('Error connecting to the database:', error);
    });

module.exports = connection;
