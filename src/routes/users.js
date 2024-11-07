const express = require('express');
const router = express.Router();

const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
];

router.get('/user', (req, res) => {
    res.json({ user: 'John Doe', age: 30 });  // Change as per your needs
});

router.get('/users', (req, res) => {
    res.json(users);  // Respond with the users array in JSON format
});

module.exports = router;
