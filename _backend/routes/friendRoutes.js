const express = require('express');
const pool = require('../db');
const router = express.Router();
const { checkAuth } = require('../middleware/authMiddleware');

router.use(checkAuth);

router.get('/pending', async (req, res) => {
    const loggedInUserId = req.userSession?.user_id;
    console.log("Attempting to fetch pending");

    if (!loggedInUserId) {
        return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }

    try {
        const [rows] = await pool.query(`
            SELECT f.friendship_id, f.friend_id AS requester_id, u.displayname AS requester_name, f.created_at
            FROM friendships f
            JOIN users u ON f.friend_id = u.user_id
            WHERE f.user_id = ? AND f.status = 'pending'
        `, [loggedInUserId]);

        console.log("Finished SQL");
        console.log('Pending Requests:', rows);
        res.json(rows || []);
    } catch (error) {
        console.error('Error fetching pending friend requests:', error);
        res.status(500).json({ error: 'Database error in fetching pending friend requests.' });
    }
});

router.post('/:friendship_id/:action(accept|reject)', async (req, res) => {
    const loggedInUserId = req.userSession?.user_id;
    const { friendship_id, action } = req.params;

    if (!loggedInUserId) {
        return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }

    const status = action === 'accept' ? 'accepted' : 'rejected';

    try {
        const [result] = await pool.query(`
            UPDATE friendships
            SET status = ?
            WHERE friendship_id = ? AND user_id = ? AND status = 'pending'
        `, [status, friendship_id, loggedInUserId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Friend request not found or already processed.' });
        }

        res.json({ message: `Friend request ${status}.` });
    } catch (error) {
        console.error(`Error ${action}ing friend request:`, error);
        res.status(500).json({ error: `Database error in ${action}ing friend request.` });
    }
});


router.get('/', async (req, res) => {
    const loggedInUserId = req.userSession?.user_id; 
    if (!loggedInUserId) {
        return res.status(401).json({ error: 'Unauthorized. Please log in.' });
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
        console.error('Error fetching friends:', error);
        res.status(500).json({ error: 'Database error in fetching friends.' });
    }
});

router.get('/:user_id', async (req, res) => {
    const loggedInUserId = req.userSession?.user_id;
    const profileUserId = req.params.user_id;

    if (!loggedInUserId) {
        return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }

    try {
        const [rows] = await pool.query(`
            SELECT f.status, u.displayname
            FROM friendships f
            JOIN users u ON u.user_id = ?
            WHERE (f.user_id = ? AND f.friend_id = ?) OR (f.user_id = ? AND f.friend_id = ?)
        `, [profileUserId, loggedInUserId, profileUserId, profileUserId, loggedInUserId]);

        if (rows.length > 0) {
            res.json({ status: rows[0].status, displayname: rows[0].displayname });
        } else {
            // even if no friendship exists, fetch the profile user's displayname
            const [userRows] = await pool.query('SELECT displayname FROM users WHERE user_id = ?', [profileUserId]);
            res.json({ status: 'not_friends', displayname: userRows[0].displayname });
        }
    } catch (error) {
        console.error('Error fetching friendship status:', error);
        res.status(500).json({ error: 'Database error in fetching friendship status.' });
    }
});

router.post('/:user_id/add', async (req, res) => {
    const loggedInUserId = req.userSession?.user_id;
    const profileUserId = req.params.user_id;

    if (!loggedInUserId) {
        return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }

    try {
        const [existing] = await pool.query(`
            SELECT status
            FROM friendships
            WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?)
        `, [loggedInUserId, profileUserId, profileUserId, loggedInUserId]);

        if (existing.length > 0) {
            return res.status(400).json({ error: 'Friendship already exists.' });
        }

        await pool.query(`
            INSERT INTO friendships (user_id, friend_id, status)
            VALUES (?, ?, 'accepted'), (?, ?, 'pending')
        `, [loggedInUserId, profileUserId, profileUserId, loggedInUserId]);

        res.json({ message: 'Friend request sent.' });
    } catch (error) {
        console.error('Error adding friend:', error);
        res.status(500).json({ error: 'Database error in adding friend.' });
    }
});

router.delete('/:user_id/remove', async (req, res) => {
    const loggedInUserId = req.userSession?.user_id;
    const profileUserId = req.params.user_id;

    if (!loggedInUserId) {
        return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }

    try {
        const [result] = await pool.query(`
            DELETE FROM friendships
            WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?)
        `, [loggedInUserId, profileUserId, profileUserId, loggedInUserId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Friendship not found.' });
        }

        res.json({ message: 'Friend removed successfully.' });
    } catch (error) {
        console.error('Error removing friend:', error);
        res.status(500).json({ error: 'Database error in removing friend.' });
    }
});

module.exports = router;