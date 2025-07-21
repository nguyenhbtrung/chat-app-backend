import bcrypt from "bcryptjs";
import { User } from "../models/index.js";

export const register = async (req, res, next) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = {
            username,
            password_hash: hashedPassword,
            email
        }
        await User.create(newUser);
        res.status(201).send('User registered');
    } catch (err) { next(err); }
};