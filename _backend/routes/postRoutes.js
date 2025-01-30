const express = require('express');
const pool = require('../db');
const router = express.Router();
const { checkAuth } = require('../middleware/authMiddleware');

router.use(checkAuth);

router.post('/', async (req, res) => {
    const { recipient_type, recipient_id, title, content, tags } = req.body;
    const sender_id = req.userSession?.user_id; // Extracted from session

    if (!sender_id) {
        return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }

    if (!title || !content || !recipient_type) {
        return res.status(400).json({ error: 'Missing required fields.' });
    }

    try {
        const [result] = await pool.query(
            `INSERT INTO posts (sender_id, recipient_type, recipient_id, title, content, tags) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [sender_id, recipient_type, recipient_id || null, title, content, tags.join(', ')]
        );

        res.status(201).json({ success: true, post_id: result.insertId });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Database error while creating post.' });
    }
});

router.put('/update/:post_id', async (req, res) => {
    const loggedInUserId = req.userSession?.user_id;
    const { title, content, tags } = req.body;
    const postId = req.params.post_id;

    if (!loggedInUserId) {
        return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }

    try {
        const [post] = await pool.query(`SELECT sender_id FROM posts WHERE post_id = ?`, [postId]);
        if (!post.length || post[0].sender_id !== loggedInUserId) {
            return res.status(403).json({ error: 'Unauthorized to edit this post.' });
        }

        await pool.query(
            `UPDATE posts SET title = ?, content = ?, tags = ? WHERE post_id = ?`,
            [title, content, tags.join(', '), postId]
        );

        res.json({ success: true });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Database error while updating post.' });
    }
});

router.delete('/delete/:post_id', async (req, res) => {
    const loggedInUserId = req.userSession?.user_id;
    const postId = req.params.post_id;

    if (!loggedInUserId) {
        return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }

    try {
        const [post] = await pool.query(`SELECT sender_id FROM posts WHERE post_id = ?`, [postId]);
        if (!post.length || post[0].sender_id !== loggedInUserId) {
            return res.status(403).json({ error: 'Unauthorized to delete this post.' });
        }

        await pool.query(`DELETE FROM posts WHERE post_id = ?`, [postId]);

        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Database error while deleting post.' });
    }
});

router.get('/search', async (req, res) => {
    const { tags } = req.query;
    const loggedInUserId = req.userSession?.user_id; 

    if (!loggedInUserId) {
        return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }

    if (!tags) {
        return res.status(400).json({ error: 'Tags are required for search.' });
    }

    const tagArray = tags.split(',').map(tag => `%${tag.trim()}%`); 
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
            AND posts.sender_id != ? 
            ORDER BY posts.created_at DESC
        `, [loggedInUserId, loggedInUserId, ...tagArray, loggedInUserId]);

        res.json(rows);
    } catch (error) {
        console.error('Error searching posts:', error);
        res.status(500).json({ error: 'Database error in searching posts.' });
    }
});

router.get('/profile', async (req, res) => {
    const loggedInUserId = req.userSession?.user_id;
    const userId = req.query.userId; 
    if (!loggedInUserId) {
        return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }

    const userToFetch = userId || loggedInUserId;

    try {
        const [rows] = await pool.query(`
            SELECT posts.*, 
                   users.username AS displayname, 
                   users.profile_picture
            FROM posts
            JOIN users ON posts.sender_id = users.user_id
            WHERE posts.sender_id = ? 
            AND (posts.recipient_type != 'specific' OR posts.recipient_id = ?)
            ORDER BY posts.created_at DESC
        `, [userToFetch, loggedInUserId]);

        res.json(rows);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Database error while fetching posts.' });
    }
});


//posts from friends
router.get('/primary', async (req, res) => {
    console.log('Cookies received in primary:', req.cookies);
    console.log('Session received in primary:', req.session);
    const loggedInUserId = req.userSession?.user_id;
    if (!loggedInUserId) {
        return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }
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
router.get('/secondary', async (req, res) => {
    console.log('Cookies received in secondary:', req.cookies);
    const loggedInUserId = req.userSession?.user_id;
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
router.get('/public', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT posts.*, 
                   users.displayname, 
                   users.profile_picture
            FROM posts
            JOIN users ON posts.sender_id = users.user_id
            WHERE posts.recipient_type = 'everyone'
            ORDER BY posts.created_at DESC
            LIMIT 50;
        `);

        res.json(rows);
    } catch (error) {
        console.error('Error fetching public posts:', error);
        res.status(500).json({ error: 'Database error in fetching public posts.' });
    }
});

module.exports = router;