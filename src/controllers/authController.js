import { loginAsync, registerAsync } from "../services/authService.js";

export const register = async (req, res, next) => {
    const { userName, password, email } = req.body;
    await registerAsync({ userName, email, password });
    res.status(201).json({ message: 'User registered successfully' });
};

export const login = async (req, res, next) => {
    const { userName, password } = req.body;
    const result = await loginAsync({ userName, password });
    res.status(200).json({
        message: 'Login successfully',
        data: result
    });
}