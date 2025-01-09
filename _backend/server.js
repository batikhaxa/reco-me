// server.js

const express = require('express');
const cookieParser = require('cookie-parser');

const cors = require('cors');
const corsOptions = {
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

// Register routes
app.use('/api', authRoutes);  // login/registration
app.use('/api/posts', postRoutes);  // post-related routes
app.use('/api/friends', friendRoutes);  // friend-related routes
app.use('/api/user', userRoutes); 