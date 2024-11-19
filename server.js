// server.js (Backend)
const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

// Fetch friends of the logged-in user
app.get('/api/friends', async (req, res) => {
    const loggedInUserId = 1; 

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

// create post
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
app.get('/api/posts/primary', async (req, res) => {
    const loggedInUserId = 1; //temp
    try {
        const [rows] = await pool.query(`
            SELECT posts.*, users.displayname
            FROM posts
            JOIN users ON posts.sender_id = users.user_id
            JOIN friendships ON (friendships.user_id = ? AND friendships.friend_id = posts.sender_id AND friendships.status = 'accepted')
            WHERE (posts.recipient_type != 'specific' OR posts.recipient_id = ?)
            ORDER BY posts.created_at DESC
        `, [loggedInUserId, loggedInUserId]);

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error in fetching primary posts' });
    }
});

// posts from friends of friends (excluding direct friends)
app.get('/api/posts/secondary', async (req, res) => {
    const loggedInUserId = 1; // Temporary hardcoded user ID

    try {
        const [rows] = await pool.query(`
            SELECT posts.*, 
                   users.displayname AS displayname, 
                   friends.displayname AS sourceFriendDisplayName,
                   friends.user_id AS sourceFriendId
            FROM posts
            JOIN users ON posts.sender_id = users.user_id
            JOIN friendships f1 ON f1.user_id = ? AND f1.status = 'accepted'
            JOIN friendships f2 ON f2.user_id = f1.friend_id AND f2.friend_id = posts.sender_id AND f2.status = 'accepted'
            LEFT JOIN friendships direct ON direct.user_id = ? AND direct.friend_id = posts.sender_id
            JOIN users AS friends ON friends.user_id = f1.friend_id
            WHERE posts.recipient_type = 'everyone' AND direct.friend_id IS NULL
            ORDER BY posts.created_at DESC
        `, [loggedInUserId, loggedInUserId]);

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error in fetching secondary posts' });
    }
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
