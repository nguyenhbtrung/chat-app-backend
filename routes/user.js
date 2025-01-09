const express = require('express');
const pool = require('../db');
const authenticate = require('../middleware/auth');
const router = express.Router();

router.get('/online', authenticate, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, username FROM Users WHERE is_online = true AND id != $1',
            [req.user.id]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/update-status', authenticate, async (req, res) => {
    const { isOnline } = req.body;
    try {
        await pool.query(
            'UPDATE Users SET is_online = $1 WHERE id = $2',
            [isOnline, req.user.id]
        );
        res.send('Status updated');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
