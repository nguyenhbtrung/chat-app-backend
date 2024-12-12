const express = require('express');
const authenticate = require('../middleware/auth');
const router = express.Router();

// Quản lý tải tệp (kết hợp WebRTC hoặc P2P ngoài backend)
router.post('/send', authenticate, (req, res) => {
    // Tạo endpoint WebRTC hoặc cơ chế P2P tại đây
    res.send('File transfer started');
});

module.exports = router;
