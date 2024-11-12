// server.js (Backend)
const express = require('express');
const cors = require('cors');
const app = express();
const usersRouter = require('./src/routes/users'); 

app.use(express.static('public'));

app.use(cors());
app.use(express.json()); 

app.use('/api', usersRouter);

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
