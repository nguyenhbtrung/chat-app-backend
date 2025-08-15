import dotenv from "dotenv";
import express, { json } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import friendshipRoutes from "./routes/friendship.routes.js";
import errorHandler from "./middleware/errorHandler.js";
import db from "./models/index.js"
import { createServer } from "http";
import { initSocket } from "./socket/index.js";

dotenv.config();

const app = express();
const server = createServer(app);

initSocket(server);

app.use(helmet({
    contentSecurityPolicy: false
}));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(json());
app.use(morgan('dev'));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/friendships", friendshipRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

(async () => {
    try {
        await db.sequelize.authenticate();
        console.log('✅ Database connected');
        server.listen(PORT, () => {
            console.log(`🚀 Express running on http://localhost:${PORT}`);
            console.log(`🚀 Socket.IO listening on ws://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ Failed to start:', err);
    }
})();