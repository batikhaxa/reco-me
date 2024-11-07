// server.js (Backend)
const express = require('express');
const cors = require('cors');
const app = express();
const usersRouter = require('./src/routes/users'); // Correct path to users.js

app.use(cors());
app.use(express.json()); // This middleware is needed to parse JSON requests

// Use the users route for /api routes
app.use('/api', usersRouter);

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
