import bcrypt from "bcryptjs";
import db from "../models/index.js";
import { registerAsync } from "../services/authService.js";

export const register = async (req, res, next) => {
    const { userName, password, email } = req.body;
    try {
        await registerAsync({ userName, email, password });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        next(err);
    }
};