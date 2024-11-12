// server.js (Backend)
const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');
app.use(express.static('public'));

app.use(cors());
app.use(express.json());

// API to get all posts (recommendations)
app.get('/api/posts', async (req, res) => {
    try {
        // Perform an SQL JOIN to fetch posts and their associated user displaynames
        const [rows] = await pool.query(`
            SELECT posts.*, users.displayname
            FROM posts
            JOIN users ON posts.sender_id = users.user_id
        `);
        res.json(rows); // Return the posts with displayname to the frontend
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
