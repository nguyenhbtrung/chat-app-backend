import { literal } from 'sequelize';
import db from '../models/index.js';

const { Notification, User, File } = db;

export const getNotificationsAsync = async (userId, page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    return await Notification.findAll({
        attributes: ['id', 'type', 'content', 'isRead', 'createdAt'],
        where: {
            userId,
        },
        include: {
            model: User,
            as: 'sender',
            attributes: [
                'id', 'userName', 'displayName',
                [literal('`sender->avatar`.`url`'), 'avatarUrl']
            ],
            include: { model: File, as: 'avatar', attributes: [] },
        },
        limit,
        offset,
        order: [['createdAt', 'DESC']],
    });
};