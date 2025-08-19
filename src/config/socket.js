export default {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST'],
        credentials: true
    },
    connectionStateRecovery: true,
    transports: ['websocket', 'polling']
};