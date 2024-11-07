const express = require('express');
const cors = require('cors');  // Import the cors module
const app = express();

// Enable CORS for all origins (you can customize this to only allow specific origins)
app.use(cors());  // This will allow your frontend (port 3000) to make requests to the backend (port 5000)

// Define a route for the homepage
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Import and use your API routes
const usersRouter = require('./src/routes/users');
app.use('/api', usersRouter);  // This ensures the /api routes are handled by usersRouter

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
