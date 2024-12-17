// middleware/authMiddleware.js
const pool = require('../db'); 

const checkAuth = async (req, res, next) => {
    console.log('Received cookies:', req.cookies); // Debug log
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
        console.log('No sessionId cookie found');
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        console.log('Querying session table with sessionId:', sessionId);
        const [sessions] = await pool.query(
            'SELECT * FROM sessions WHERE session_id = ? AND expires_at > NOW()',
            [sessionId]
        );

        if (sessions.length === 0) {
            console.log('Session not found or expired');
            return res.status(401).json({ error: 'Session expired or invalid' });
        }

        req.userSession = sessions[0]; // Attach database session to req.userSession
        console.log('Session validated successfully:', req.userSession);
        next();
    } catch (err) {
        console.error('Session validation error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { checkAuth };
