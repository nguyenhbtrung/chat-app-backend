import bcrypt from "bcryptjs";
import db from "../models/index.js";

export const register = async (req, res, next) => {
    const { userName, password, email } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    try {
        const newUser = { userName, passwordHash, email }
        await db.User.create(newUser);
        res.status(201).send('User registered');
    } catch (err) { next(err); }
};