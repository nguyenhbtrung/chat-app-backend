import { verifiyToken } from '../../utils/auth.js';

export const attachGlobalMiddleware = (socket, next) => {
    try {
        const token = socket.handshake.auth?.token;
        if (!token) return next(new Error('AUTH_REQUIRED'));

        const user = verifiyToken(token);
        socket.user = user;
        return next();
    } catch (err) {
        return next(new Error('AUTH_FAILED'));
    }
};