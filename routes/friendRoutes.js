const express = require('express');
const pool = require('../db');
const router = express.Router();
const { checkAuth } = require('../middleware/authMiddleware');

router.use(checkAuth);

router.get('/', async (req, res) => {
    // Get userId from query parameters
    const loggedInUserId = req.userSession?.user_id;
    if (!loggedInUserId) {
        return res.status(400).json({ error: 'userId is required' });
    }

    try {
        const [rows] = await pool.query(`
            SELECT u.user_id AS value, u.displayname AS label
            FROM users u
            JOIN friendships f ON f.friend_id = u.user_id
            WHERE f.user_id = ? AND f.status = 'accepted'
        `, [loggedInUserId]);

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error in fetching friends' });
    }
});

module.exports = router;