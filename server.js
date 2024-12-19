// server.js

const express = require('express');
const cookieParser = require('cookie-parser');

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // allows cookies to be sent/received
};

const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const friendRoutes = require('./routes/friendRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors(corsOptions)); // Apply CORS globally

app.use(session({
    secret: 'Wsjj4JWZYsmy', // Replace with a strong secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS in production
        sameSite: 'lax',
        maxAge: 3600000, // 1 hour
    },
}));

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

<<<<<<< HEAD
// Register routes
app.use('/api', authRoutes);  // login/registration
app.use('/api/posts', postRoutes);  // post-related routes
app.use('/api/friends', friendRoutes);  // friend-related routes
app.use('/api/user', userRoutes); 
=======
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Fetch user with matching email
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const user = users[0];

        // Compare the password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // !! token !!
        const token = jwt.sign({ user_id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            user: { id: user.id, email: user.email, displayname: user.displayname },
            token, // Optional: use this token for authentication in frontend
        });
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
        // Check if the email or username already exists
        const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ? OR username = ?', [email, username]);
        
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Email or Username is already registered' });
        }

        // Hash the password
        bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error hashing password' });
            }

            // Save the new user to the database
            try {
                const [result] = await pool.query(
                    'INSERT INTO users (displayname, username, email, password_hash) VALUES (?, ?, ?, ?)',
                    [displayname, username, email, hashedPassword]
                );
            
                res.status(201).json({ success: true, user_id: result.insertId });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Database error while registering user' });
            }
            
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error checking email or username in database' });
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
            SELECT posts.*, users.displayname
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
            LIMIT 50;
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
>>>>>>> main

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});