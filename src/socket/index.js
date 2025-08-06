import { Server } from 'socket.io';
import socketConfig from '../config/socket.js';
import { attachGlobalMiddleware } from './middlewares/auth.js';

let io;

const registerHandlers = (socket) => {
    socket.on('register', (userId) => {
        if (!userSocketMap[userId]) {
            userSocketMap[userId] = new Set();
        }
        userSocketMap[userId].add(socket.id);
        socket.userId = userId;
        console.log(">>>userSocketMap: ", userSocketMap);
    });
};

export const userSocketMap = {};

export const initSocket = (httpServer) => {
    io = new Server(httpServer, socketConfig);
    io.use(attachGlobalMiddleware);

    io.on('connection', (socket) => {
        console.log(`New client connected: ${socket.id}`);

        registerHandlers(socket);

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });

    });

    io.on('error', err => console.error('Socket.IO error', err));
    io.on('warning', w => console.warn('Socket.IO warn', w));

};

export const getIO = () => {
    if (!io) throw new Error('Socket.IO not initialized!');
    return io;
};