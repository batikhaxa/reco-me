const express = require('express');
const app = express();
app.use(express.json()); 

const pool = require('../db');
const router = express.Router();
const { checkAuth } = require('../middleware/authMiddleware');

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.use(checkAuth);

router.post('/sidebar', async (req, res) => {
    const loggedInUserId = req.userSession?.user_id;
    if (!loggedInUserId) {
        return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }
    try {
        const [rows] = await pool.query(`
            SELECT displayname, profile_picture
            FROM users
            WHERE user_id = ?
        `, [loggedInUserId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const user = rows[0];
        res.json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/profile', async (req, res) => {
    const loggedInUserId = req.userSession?.user_id;
    if (!loggedInUserId) {
        return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }

    const { displayname, onlineProfileImageLink } = req.body;

    if (!displayname && !onlineProfileImageLink) {
        return res.status(400).json({ error: 'No changes detected for profile update' });
    }

    try {
        const updateFields = [];
        const updateValues = [];

        if (displayname) {
            updateFields.push('displayname = ?');
            updateValues.push(displayname);
        }
        if (onlineProfileImageLink) {
            updateFields.push('profile_picture = ?');
            updateValues.push(onlineProfileImageLink);
        }

        // Perform the update
        const query = `
            UPDATE users
            SET ${updateFields.join(', ')}
            WHERE user_id = ?
        `;
        updateValues.push(loggedInUserId);

        const [result] = await pool.query(query, updateValues);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/password', async (req, res) => {
    console.log('Request body:', req.body); 
    const loggedInUserId = req.userSession?.user_id;
    if (!loggedInUserId) {
        return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }

    const { oldPassword, password, confirmPassword } = req.body;

    if (!oldPassword || !password || !confirmPassword) {
        return res.status(400).json({ error: 'All password fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    try {
        const [users] = await pool.query('SELECT * FROM users WHERE user_id = ?', [loggedInUserId]);

        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const user = users[0];

        const passwordMatch = await bcrypt.compare(oldPassword, user.password_hash);
        if (!passwordMatch) {
            return res.status(400).json({ error: 'Incorrect current password' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const [result] = await pool.query(
            'UPDATE users SET password_hash = ? WHERE user_id = ?',
            [hashedPassword, loggedInUserId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
