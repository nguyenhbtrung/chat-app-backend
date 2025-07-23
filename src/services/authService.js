import bcrypt from 'bcryptjs';
import db from '../models/index.js';
import { Op } from 'sequelize';

export const registerAsync = async ({ userName, password, email }) => {
    try {
        const existingUser = await db.User.findOne({
            where: {
                [Op.or]: [{ email }, { userName }]
            }
        });

        if (existingUser) {
            const duplicatedField = existingUser.email === email ? 'email' : 'userName';
            const error = new Error(`${duplicatedField} already exists`);
            error.code = duplicatedField === 'email' ? 'DUPLICATE_EMAIL' : 'DUPLICATE_USERNAME';
            error.statusCode = 409;
            error.fields = { [duplicatedField]: `${duplicatedField} already exists` };
            throw error;
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = { userName, passwordHash, email };
        return await db.User.create(newUser);

    } catch (err) {
        throw err;
    }
};
