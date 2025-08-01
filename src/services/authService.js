import bcrypt from 'bcryptjs';
import db from '../models/index.js';
import { Op } from 'sequelize';
import { generateToken } from '../utils/auth.js';
import {
    AppError,
    InvalidCredentialsError
} from '../errors/index.js';

export const registerAsync = async ({ userName, password, email }) => {
    try {
        const existingUser = await db.User.findOne({
            where: {
                [Op.or]: [{ email }, { userName }]
            }
        });

        if (existingUser) {
            const duplicatedField = existingUser.userName === userName ? 'userName' : 'email';
            throw new AppError(
                `${duplicatedField} already exists`,
                duplicatedField === 'email' ? 'DUPLICATE_EMAIL' : 'DUPLICATE_USERNAME',
                409,
                { [duplicatedField]: `${duplicatedField} already exists` }
            );
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = { userName, passwordHash, email };
        return await db.User.create(newUser);

    } catch (err) {
        throw err;
    }
};

export const loginAsync = async ({ userName, password }) => {
    try {
        const existingUser = await db.User.findOne({ where: { userName } });
        if (!existingUser)
            throw new InvalidCredentialsError();

        const isValidPassword = await bcrypt.compare(password, existingUser.passwordHash);
        if (!isValidPassword)
            throw new InvalidCredentialsError();

        const user = {
            id: existingUser.id,
            userName,
            email: existingUser.email
        };
        const token = generateToken(user);
        return { user, token };

    } catch (error) {
        throw error;
    }

};
