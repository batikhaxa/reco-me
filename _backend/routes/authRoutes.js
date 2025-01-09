const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const dayjs = require('dayjs');
const pool = require('../db');
const router = express.Router();
const saltRounds = 10;

const { checkAuth } = require('../middleware/authMiddleware');

router.get('/auth/status', checkAuth, (req, res) => {
    res.status(200).json({ loggedIn: true, userId: req.userSession.user_id });
});

router.post('/login', async (req, res) => {
    console.log('Attempting log in');
    const { email, password } = req.body;

    if (!email || !password) {
        console.log('Input error');
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        console.log('Attempting user auth');
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const user = users[0];
        console.log('User found:', user);

        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        console.log('Attempting session id');
        const sessionId = crypto.randomUUID();
        const expiresAt = dayjs().add(1, 'hour').toDate();

        await pool.query(
            'INSERT INTO sessions (session_id, user_id, expires_at) VALUES (?, ?, ?)',
            [sessionId, user.user_id, expiresAt]
        );

        res.cookie('sessionId', sessionId, {
            httpOnly: true,
            secure: true, 
            sameSite: 'lax',
            path: '/',
            maxAge: 3600000, // 1 hour in milliseconds
        });

        console.log('Session ID:', sessionId);

        res.status(200).json({
            message: 'Login successful',
            user: { id: user.id, email: user.email, displayname: user.displayname },
        });

        console.log('Login successful!');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/logout', async (req, res) => {
    const sessionId = req.cookies.sessionId;
    if (!sessionId) {
        return res.status(400).json({ error: 'No session ID provided' });
    }
    try {
        await pool.query('DELETE FROM sessions WHERE session_id = ?', [sessionId]);
        res.clearCookie('sessionId', {
            httpOnly: true,
            secure: false, // Change to true in production with HTTPS
            sameSite: 'lax',
            path: '/', // Ensure the cookie is cleared globally
        });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/registration', async (req, res) => {
    console.log('Received registration data:', req.body); 
    const { displayname, username, email, password } = req.body;

    if (!displayname || !username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        console.log('Checking for existing user...');
        const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ? OR username = ?', [email, username]);
        if (existingUser.length > 0) {
            console.log('User already exists.');
            return res.status(400).json({ error: 'Email or Username is already registered' });
        }
        console.log('Hashing password...');
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const [result] = await pool.query(
            'INSERT INTO users (displayname, username, email, password_hash) VALUES (?, ?, ?, ?)',
            [displayname, username, email, hashedPassword]
        );
        console.log('User registration successful.');
        res.status(201).json({ success: true, user_id: result.insertId });
    } catch (error) {
        console.error('Error occurred during registration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;