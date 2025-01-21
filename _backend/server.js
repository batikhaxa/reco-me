const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const friendRoutes = require('./routes/friendRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

const corsOptions = {
    credentials: true, // allows cookies
    origin: process.env.CLIENT_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};
app.use(cors(corsOptions));

// Middleware 
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// Register routes
app.use('/api', authRoutes);  // login/registration
app.use('/api/posts', postRoutes);  // post-related routes
app.use('/api/friends', friendRoutes);  // friend-related routes
app.use('/api/user', userRoutes);  // user-related routes

module.exports = app;

const PORT = 5000; 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
