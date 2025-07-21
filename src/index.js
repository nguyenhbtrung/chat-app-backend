import dotenv from "dotenv";
import express, { json } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(json());
app.use(morgan('dev'));

app.use("/auth", authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected');
        app.listen(PORT, () => console.log(`🚀 Server listening on http://localhost:${PORT}`));
    } catch (err) {
        console.error('❌ Failed to start:', err);
    }
})();