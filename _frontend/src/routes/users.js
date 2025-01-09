// src/routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../../db');  // Corrected path to db.js

router.get('/users', async (req, res) => {
    try {
        const [users] = await db.query('SELECT * FROM Users');
        res.json(users); // Send users data as JSON response
    } catch (error) {
        console.error('Database error:', error); // Log any database errors
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
});

module.exports = router;
