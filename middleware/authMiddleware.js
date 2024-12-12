// middleware/authMiddleware.js
const pool = require('../db'); 

const checkAuth = (req, res, next) => {
    console.log('Received cookies:', req.cookies); // Debug log
    const sessionId = req.cookies.sessionId;
    if (!sessionId) {
        console.log('No sessionId cookie found'); // Debug log
        return res.status(401).json({ error: 'Unauthorized' });
    }
    pool.query('SELECT * FROM sessions WHERE session_id = ? AND expires_at > NOW()', [sessionId], (err, sessions) => {
        if (err) {
            console.error('Session validation error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (sessions.length === 0) {
            console.log('Session not found or expired'); // Debug log
            return res.status(401).json({ error: 'Session expired or invalid' });
        }
        req.session = sessions[0]; // Attach session to request object
        console.log('Session validated successfully:', req.session); // Debug log
        next();
    });
};

module.exports = { checkAuth };
