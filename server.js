require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http'); // Import http
const socketServer = require('./socketServer'); // Import signaling server

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/files', require('./routes/file'));
app.use('/api/ice-servers', require('./routes/iceServers'));

// Tạo server HTTP
const server = http.createServer(app);

// Tích hợp Socket.IO vào server HTTP
socketServer(server);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
