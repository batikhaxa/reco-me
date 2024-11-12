// server.js (Backend)
const express = require('express');
const cors = require('cors');
const app = express();
const usersRouter = require('./src/routes/users'); 
const pool = require('./db');
app.use(express.static('public'));

app.use(cors());
app.use(express.json()); 

app.get('/api/displayname', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT displayname FROM users LIMIT 1');
        res.json(rows[0]); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});


app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});