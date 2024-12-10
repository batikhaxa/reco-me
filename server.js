// server.js (Backend)
const express = require('express');

const app = express();
const pool = require('./db');
const bcrypt = require('bcrypt'); // bcrypt: stronger but slower. good for passwords
const crypto = require('crypto'); // crypto: weaker but faster. good for quick validation
const dayjs = require('dayjs');
const cookieParser = require('cookie-parser'); 
const saltRounds = 10;

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser()); 

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true, // allows cookies to be sent/received
};
app.use(cors(corsOptions));

app.use(async (req, res, next) => {
    const sessionId = req.cookies.sessionId;
    if (!sessionId) {
        return next(); // Skip session validation if there's no sessionId cookie
    }
    try {
        const [sessions] = await pool.query(
            'SELECT * FROM sessions WHERE session_id = ? AND expires_at > NOW()',
            [sessionId]
        );
        if (sessions.length > 0) {
            req.session = sessions[0];
        } else {
            // clear invalid/expired session cookie
            res.clearCookie('sessionId');
        }
    } catch (error) {
        console.error('Session validation error:', error);
    }
    next();
});

app.post('/api/login', async (req, res) => {
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
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        console.log('Session ID: ' + sessionId)
        res.status(200).json({
            message: 'Login successful',
            user: { id: user.id, email: user.email, displayname: user.displayname },
        });
        console.log('login successful!');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/api/registration', async (req, res) => {
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

// search posts based on tags (from friends only)
app.get('/api/posts/search', async (req, res) => {
    const { userId, tags } = req.query;

    if (!userId || !tags) {
        return res.status(400).json({ error: 'userId and tags are required' });
    }

    const tagArray = tags.split(','); // Tags come as a comma-separated string

    // Prepare query with placeholders for tags
    const tagConditions = tagArray.map(() => 'posts.tags LIKE ?').join(' AND ');

    try {
        const [rows] = await pool.query(`
            SELECT posts.*, 
                   users.displayname, 
                   users.profile_picture
            FROM posts
            JOIN users ON posts.sender_id = users.user_id
            JOIN friendships ON friendships.user_id = ? 
                AND friendships.friend_id = posts.sender_id 
                AND friendships.status = 'accepted'
            WHERE (posts.recipient_type != 'specific' OR posts.recipient_id = ?)
            AND ${tagConditions}
            ORDER BY posts.created_at DESC
        `, [userId, userId, ...tagArray.map(tag => `%${tag.trim()}%`)]);

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error in searching posts' });
    }
});

// Fetch friends of the logged-in user
app.get('/api/friends', async (req, res) => {
    // Get userId from query parameters
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }

    try {
        const [rows] = await pool.query(`
            SELECT u.user_id AS value, u.displayname AS label
            FROM users u
            JOIN friendships f ON f.friend_id = u.user_id
            WHERE f.user_id = ? AND f.status = 'accepted'
        `, [userId]);

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error in fetching friends' });
    }
});


// create posts
app.post('/api/posts', async (req, res) => {
    const { sender_id, recipient_type, recipient_id, title, content, tags } = req.body;

    try {
        const [result] = await pool.query(
            `INSERT INTO posts (sender_id, recipient_type, recipient_id, title, content, tags) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [sender_id, recipient_type, recipient_id || null, title, content, tags.join(', ')]
        );

        res.status(201).json({ success: true, post_id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error while creating post' });
    }
});


//posts from friends
// posts from friends
app.get('/api/posts/primary', async (req, res) => {
    const loggedInUserId = 1; // temp
    try {
        const [rows] = await pool.query(`
            SELECT posts.*, 
                   users.displayname, 
                   users.profile_picture
            FROM posts
            JOIN users ON posts.sender_id = users.user_id
            JOIN friendships ON (friendships.user_id = ? AND friendships.friend_id = posts.sender_id AND friendships.status = 'accepted')
            WHERE (posts.recipient_type != 'specific' OR posts.recipient_id = ?)
            ORDER BY posts.created_at DESC
            LIMIT 50;
        `, [loggedInUserId, loggedInUserId]);

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error in fetching primary posts' });
    }
});

// posts from friends of friends (excluding direct friends)
// posts from friends of friends (excluding direct friends)
app.get('/api/posts/secondary', async (req, res) => {
    const loggedInUserId = 1; // Temporary hardcoded user ID

    try {
        const [rows] = await pool.query(`
            SELECT posts.*, 
                   users.displayname AS displayname, 
                   users.profile_picture AS profile_picture, 
                   friends.displayname AS sourceFriendDisplayName,
                   friends.user_id AS sourceFriendId
            FROM posts
            JOIN users ON posts.sender_id = users.user_id
            JOIN friendships f1 ON f1.user_id = ? AND f1.status = 'accepted'
            JOIN friendships f2 ON f2.user_id = f1.friend_id AND f2.friend_id = posts.sender_id AND f2.status = 'accepted'
            LEFT JOIN friendships direct ON direct.user_id = ? AND direct.friend_id = posts.sender_id
            JOIN users AS friends ON friends.user_id = f1.friend_id
            WHERE posts.recipient_type = 'everyone' 
              AND direct.friend_id IS NULL
              AND posts.sender_id != ?  -- Exclude the logged-in user's posts
            ORDER BY posts.created_at DESC
            LIMIT 50;
        `, [loggedInUserId, loggedInUserId, loggedInUserId]);

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error in fetching secondary posts' });
    }
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
