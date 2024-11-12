// test-db-connection.js
const pool = require('./db');

(async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        
        console.log('Connection successful! Data in users table:', rows);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    } finally {
        await pool.end();
    }
})();
