// db.js
require('dotenv').config(); 
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    uri: process.env.MYSQL_URL, 
});
// const oldPool = mysql.createPool({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
// });
module.exports = pool;
