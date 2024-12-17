const express = require('express');
const pool = require('../db');
const router = express.Router();
const { checkAuth } = require('../middleware/authMiddleware');

router.use(checkAuth);

router.post('/', async (req, res) => {
   const loggedInUserId = req.userSession?.user_id;
});

module.exports = router;