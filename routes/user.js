const express = require('express');
const { sql, poolPromise } = require('../db');
const authenticate = require('../middleware/auth');
const router = express.Router();

router.get('/online', authenticate, async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.query(
            "SELECT id, username FROM Users WHERE is_online = 1 AND id != @id",
            { id: req.user.id }
        );
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/update-status', authenticate, async (req, res) => {
    const { isOnline } = req.body;
    try {
        const pool = await poolPromise;
        await pool
            .request()
            .input('id', sql.Int, req.user.id)
            .input('is_online', sql.Bit, isOnline)
            .query('UPDATE Users SET is_online = @is_online WHERE id = @id');
        res.send('Status updated');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;